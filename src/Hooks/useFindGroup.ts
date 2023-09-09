import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { initGroup } from "../data/initialData";
import { GroupInfoType } from "../Type/MissionType";
import groupListData from "../data/groupListData";

interface FindGroupHook {
  intro: string;
  rule: string;
  url: string;
}

/** 2023-08-23 useFindGroup.ts - uuid를 받아 intro rule url 뱉는 함수 */
const useFindGroup = (sort: "page" | "intro"): FindGroupHook => {
  const { uuid } = useParams();

  const [group, setGroup] = useState(initGroup);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (uuid) {
      const foundGroup = FindGroup(uuid, initGroup);
      const imageUrl = sort === "intro" ? foundGroup.defaultImage.intro_url : foundGroup.defaultImage.group_url;
      if (imageUrl === undefined) return;

      setGroup(foundGroup);
      setImageUrl(imageUrl);
    }
  }, [uuid]);

  const { intro, rule } = group;
  return { intro, rule, url: imageUrl };
};

/**
 * 2023-08-23 useFindGroup.ts - 파라미터로 그룹과 썸네일 찾는 함수
 * @param uuid 접속한 그룹 페이지의 파라미터
 * @param initGroup 예외처리를 위한 초기 값
 * @returns 내가 속한 그룹, 썸네일Url
 */
const FindGroup = (uuid: string | undefined, initGroup: GroupInfoType): GroupInfoType => {
  const initValue = initGroup;
  if (uuid === undefined) return initValue;

  // groupListData.find((group) => group.group_id);
  const foundGroup = groupListData.find((group) => group.group_id === Number(uuid));
  if (foundGroup === undefined) return initValue;

  return foundGroup;
};

/**
 * 2023-08-23 useFindGroup.ts - 그룹 썸네일 찾는 함수
 * @param myGroup 참여중인 그룹
 * @returns 썸네일Url
 */
const findUrl = (myGroup: GroupInfoType): string => {
  const thumbnailId = myGroup.defaultImage.defaultImage_id;

  const post = myGroup.posts.find((post) => post.image.image_id === thumbnailId);
  if (post === undefined) return "";
  const image = post.image.image_id === thumbnailId;
  if (image === undefined) return "";

  return post.image.url;
};

export { useFindGroup, findUrl };
