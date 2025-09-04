import useBillboard from "@/hooks/useBillboard";
import React from "react";

const Billboard = () => {
  const { data, isLoading, error } = useBillboard();

  if (isLoading) {
    return (
      <div className="relative h-[56.25vw] flex items-center justify-center">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative h-[56.25vw] flex items-center justify-center">
        <p className="text-red-500 text-lg">Failed to load billboard</p>
      </div>
    );
  }

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-full object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      />
      <div className="absolute top-[30%] left-[5%]">
        <h1 className="text-white text-3xl md:text-5xl font-bold drop-shadow-xl">
          {data?.title}
        </h1>
        <p className="text-white mt-3 w-[90%] md:w-[60%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
      </div>
    </div>
  );
};

export default Billboard;
