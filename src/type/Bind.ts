type Bind<T> = {
  state: T;
  Setter: React.Dispatch<React.SetStateAction<T>>;
};

export default Bind;
