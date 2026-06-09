export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-md z-50">
      {" "}
      <div className="flex flex-col items-center gap-5">
        {" "}
        {/* Golden Spinner */}{" "}
        <div className="relative w-16 h-16">
          {" "}
          <div className=" absolute inset-0 rounded-full border-4 border-[#3a2d08] "></div>{" "}
          <div className=" absolute inset-0 rounded-full border-4 border-transparent border-t-[#f5d36b] border-r-[#c9a227] animate-spin "></div>{" "}
        </div>{" "}
        {/* Loading Text */}{" "}
        <p className=" text-[#f5d36b] font-semibold text-lg tracking-[4px] uppercase drop-shadow-[0_0_10px_rgba(245,211,107,0.5)] ">
          {" "}
          Processing...{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
