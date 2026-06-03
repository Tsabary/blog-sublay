import { User } from "@sublay/react-js";

function UserAvatar({
  user,
  size = 32,
  borderRadius,
}: {
  user: Partial<User> | undefined;
  size?: number | undefined;
  borderRadius?: number | undefined;
  colors?: string[] | undefined;
}) {
  if (!user) return null;
  return (
    <div
      style={{
        overflow: "hidden",
        width: size,
        maxWidth: size,
        height: size,
        maxHeight: size,
        borderRadius: borderRadius || size,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        display: "inline-block",
        flexShrink: 0,
        backgroundColor: "white",
      }}
    >
      <img
        src={
          user.avatar ??
          `https://api.dicebear.com/9.x/identicon/svg?seed=${user.id}`
        }
        alt={user.name || user.id}
        style={{
          padding: 0,
          margin: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
}

export default UserAvatar;
