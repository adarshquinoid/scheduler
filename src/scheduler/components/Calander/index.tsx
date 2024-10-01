import dayjs from "dayjs";
import { useState } from "react";
import { Months, styles } from "../../helpers/constants";

type DatesByMonth = {
  [key: string]: Date[];
};
const Calander = ({ employeeDatas }: any) => {
  const [activeYear] = useState(2024);

  function generateDatesByMonth(): DatesByMonth {
    const datesByMonth: DatesByMonth = {};

    for (let month = 0; month < 12; month++) {
    //   const monthName = new Date(activeYear, month).toLocaleString("default", {
    //     month: "long",
    //   });
      const daysInMonth = new Date(activeYear, month + 1, 0).getDate();
      const dates: Date[] = [];

      for (let day = 1; day <= daysInMonth; day++) {
        dates.push(new Date(activeYear, month, day));
      }

      datesByMonth[month] = dates;
    }

    return datesByMonth;
  }

  const datesByMonth: DatesByMonth = generateDatesByMonth();
  console.log(datesByMonth)

  return (
    <div>
      <div className="flex h-[32px]">
        {Object.keys(datesByMonth).map((key: any) => (
          <>
            <div
              style={{
                width: datesByMonth[+key]?.length * styles.dayColWidth,
              }}
              className="flex text-[12px] leading-[14px] font-normal border-t border-b border-r border-[#EDEAE9]"
            >
              <div className="p-2.5 text-[12px] leading-[14px] font-normal h-full">
                {" "}
                {Months[+key as keyof typeof Months]}
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="flex h-[24px]">
        {Object.keys(datesByMonth).map((key: any) => (
          <>
            {datesByMonth[+key]?.map((days) => (
              <div
                className="border-b border-r border-[#EDEAE9]"
                style={{ width: styles.dayColWidth }}
              >
                <div className="h-6 w-10 flex items-center justify-center text-[12px] leading-[14px] font-normal">
                  {days ? dayjs(days).format("DD") : ""}
                </div>
              </div>
            ))}
          </>
        ))}
      </div>
      <div>
        <div>
          {employeeDatas?.map((_emp: any) => (
            <div className="flex h-[24px]">
              {Object.keys(datesByMonth).map((key: any) => (
                <>
                  <>
                    {datesByMonth[+key]?.map((days) => (
                      <div
                        className="border-b border-r border-[#EDEAE9]"
                        style={{ width: styles.dayColWidth }}
                      >
                        <div className="h-6 w-10 flex items-center justify-center text-[12px] leading-[14px] font-normal">
                          {/* {days ? dayjs(days).format("DD") : ""} */}
                        </div>
                      </div>
                    ))}
                  </>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calander;
