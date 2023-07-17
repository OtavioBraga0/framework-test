import React, { ImgHTMLAttributes } from "react";
import * as AvatarStyle from "./style";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  src?: string;
  alt?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  width = 104,
  height = 104,
  alt,
  src,
  objectFit,
  ...rest
}) => {
  return (
    <AvatarStyle.Wrapper
      {...rest}
      alt={alt}
      src={src}
      width={width}
      height={height}
      style={{
        borderRadius: "50%",
        objectFit,
      }}
    />
  );
};
