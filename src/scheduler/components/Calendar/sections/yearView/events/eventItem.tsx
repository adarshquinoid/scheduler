import React from "react";

const EventItem: React.FC<any> = ({
  gridSize,
  eventLength,
  gridHeight,
  ind,
  groupIndex,
  background,
  data = [],
}) => {
  console.log("data", data);

  return (
    <div
      className="absolute z-20  "
      style={{
        width: gridSize * eventLength,
        height: gridHeight - 10,
        left: ind * gridSize,
        borderRadius: 6,

        top: groupIndex * gridHeight + 5,
      }}
    >
      <div
        className="px-2 z-20 flex items-center justify-start relative resize-x overflow-hidden ml-[1px]"
        style={{
          width: gridSize * eventLength - 2,
          height: gridHeight - 10,
          borderRadius: 6,
          background: background,
        }}
      >
        {/* /// */}
        <div style={{ height: 32 }} className="flex justify-start">
          <div className=" ">
            <div
              className=" relative flex gap-1 max-w-[64px]"
              style={{
                width: data?.length > 3 ? 64 : (data?.length / 3) * 64,
              }}
            >
              {data?.length > 3 && (
                <div
                  className=" flex justify-center items-center absolute w-8 h-8 rounded-full bg-black bg-opacity-50 text-white"
                  style={{ left: `0px`, zIndex: 99 }}
                >
                  {data?.length - 3}
                </div>
              )}
              {data?.map((item: any, index: number) => {
                if (index > 2) {
                  return null;
                }
                return (
                  <div
                    className="absolute h-8"
                    key={index}
                    style={{
                      left: `${index * 16}px`,
                      zIndex: 3 - index,
                    }}
                  >
                    <img
                      src={item?.image}
                      alt=""
                      className=" w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className="text-white h-8 flex justify-start items-center absolute truncate"
            style={{
              left: data?.length > 3 ? 64 + 8 : (data?.length / 3) * 64 + 8,
            }}
          >
            {data?.map((item: any, i: number) => (
              <>
                {i !== 0 && <div>{","}</div>}
                <div>{item?.name}</div>
              </>
            ))}
          </div>
        </div>
        {/* /// */}
      </div>
    </div>
  );
};

export default EventItem;
