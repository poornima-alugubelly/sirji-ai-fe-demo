interface AvatarType {
  text: string;
  classNames?: string;
}

export const Avatar = ({ text, classNames = '' }: AvatarType) => {
  return (
    <div
      className={`grid place-content-center rounded-full w-8 h-8 ${classNames}`}
    >
      {text}
    </div>
  );
};
