import { validateRequest } from "@/auth";
import { TaskBoard } from "@/components/TaskBoard/TaskBoard";
import { UserDoc } from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (!session) {
    return redirect("/login");
  }


  const response = await fetch(`http://localhost:3005/getUserInfo`, {
    method: "POST",
    body: JSON.stringify({
      userId: user.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: UserDoc = await response.json(); 

  return (
    <div className=" p-[24px] flex flex-col w-full space-y-[24px]">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-3xl font-semibold">
          Good morning, {user.username.split(" ")[0]}!
        </h1>
        <button className="flex items-center gap-[8px]">
          <h1 className="text-[16px]">Help & feedback</h1>
          <Image alt="img" width={24} height={24} src={"/help.svg"} />
        </button>
      </div>

      <div className="flex flex-row items-center justify-between gap-[8px]">
        {cardItems.map((item, index) => {
          return (
            <div
              // draggable
              key={index}
              className="flex flex-row rounded-[8px] py-[24px] px-[16px] border gap-[16px]"
            >
              <Image alt="img" width={64} height={64} src={item.img} />
              <div className="flex flex-col items-start gap-[6px]">
                <h1 className="text-[#757575] font-[600] text-[16px]">
                  {item.title}
                </h1>
                <p className="text-[14px] font-[400] text-[#868686]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-between border rounded-[8px] p-[8px] ">
          <input
            placeholder="Search"
            className="outline-none overflow-hidden font-[400] text-[16px] text-[#797979]"
          ></input>
          <Image alt="img" width={24} height={24} src={"/search.svg"} />
        </div>

        <div className="flex items-center space-x-[16px]">
          {options.map((option, index) => {
            return (
              <button
                key={index}
                className="flex p-[10px] rounded-[8px] border gap-[14px] shadow-md"
              >
                <h1 className="font-[400px] text-[16px] text-[#797979]">
                  {option.title}
                </h1>
                <Image alt="img" width={24} height={24} src={option.img} />
              </button>
            );
          })}
          <button className="shadow-xl bg-[#4534ac] text-[#ffffff] p-[10px] rounded-[8px] flex items-center justify-center gap-[8px]">
            <h1>Create new </h1>
            <Image alt="img" width={24} height={24} src={"/plus.svg"} />
          </button>
        </div>
      </div>

     <TaskBoard user={data} />
    </div>
  );
}

const cardItems = [
  {
    img: "/tags.svg",
    title: "Introducing tags",
    description:
      "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
  },
  {
    img: "/share.svg",
    title: "Share notes instantly",
    description:
      "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
  },
  {
    img: "/access.svg",
    title: "Access anywhere",
    description:
      "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
  },
];

const options = [
  {
    img: "/calendar.svg",
    title: "Calendar view",
  },
  {
    img: "/automation.svg",
    title: "Automation",
  },
  {
    img: "/filter.svg",
    title: "Filter",
  },
  {
    img: "/sharing.svg",
    title: "Share",
  },
];
