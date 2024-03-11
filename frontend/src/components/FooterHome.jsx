// import React from "react";
// bg-[#212177]
// function FooterHome() {
//   return (
//     <footer className=" py-14  flex flex-wrap flex-row items-start justify-around  text-white ">
//       <div className="bloc1 flex flex-col ">
//         <div className="w-[379px] flex flex-col items-start justify-start   ">
//           <div className="w-[295px] flex flex-col items-end justify-start gap-[7px_0px]">
//             <div className="flex flex-row items-end justify-start gap-[0px_6px]">
//               <img
//                 className="h-[77px] w-[65px] pt-3 object-cover"
//                 alt="Logo"
//                 src="/imageremovebgpreview-81-1@2x.png"
//               />
//               <h3 className=" tracking-[0.15em] font-bold text-4xl  mq750:text-10xl mq450:text-3xl">
//                 acticFlow
//               </h3>
//             </div>
//             <div className=" tracking-[0.15em] px-4 font-semibold flex flex-row items-start justify-start py-0  text-base text-white">
//               <span className="mr-1">Created By </span>
//               <span className="text-[#FFC107] "> TAC-TIC</span>
//             </div>
//           </div>
//         </div>
//         <div className="w-[350px]  tracking-[0.03em]  flex items-start justify-start  pl-[26px] box-border max-w-full text-base text-white ">
//           <p className="mt-6">
//             A group of companies, specialized in the field of software
//             engineering, computer networks and telecommunications. TAC-TIC has
//             today become a subsidiary of the New Ways Group, a group of
//             companies, each specialized in a specific field.
//           </p>
//         </div>
//       </div>
//       <div className="bloc2 flex flex-col pt-10 items-start justify-center">
//         <div className="flex flex-col items-center justify-start gap-[33px_0px]">
//           <b className="tracking-[0.15em] font-bold text-2xl  ">Contact</b>
//           <div className=" flex flex-col items-start justify-start gap-[16px_0px] text-base">
//             <div className="flex flex-row items-start justify-start gap-[0px_28px]">
//               <img
//                 className="h-[32.1px] w-[29.3px] "
//                 alt=""
//                 src="/vector.svg"
//               />
//               <div className=" tracking-[0.15em] items-start justify-start  font-medium pt-[7px]  ">
//                 <p>+216 36 365 558</p>
//               </div>
//             </div>
//             <div className="self-stretch flex flex-row items-start justify-start gap-[0px_18px]">
//               <img
//                 className="h-10 w-10  overflow-hidden "
//                 alt=""
//                 src="/email.svg"
//               />
//               <p className="tracking-[0.15em] pt-2 font-medium [margin-block-start:0] [margin-block-end:10px]">
//                 contact@tac-tic.net
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="bloc3 flex flex-col pt-10 items-center justify-start gap-[59px_0px]">
//         <b className="tracking-[0.15em] text-lg ">Stay Informed</b>
//
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default FooterHome;
import React from "react";

function FooterHome() {
  return (
    <footer className=" bg-midnightblue py-6 text-white">
      <div className="container mx-auto px-4 flex flex-wrap  justify-between items-center">
        <div className="flex flex-col justify-center  w-full md:w-1/3">
          <div className="flex items-center mb-4">
            <img
              className="h-10 w-auto mb-2 mr-2"
              alt="Logo"
              src="/imageremovebgpreview-81-1@2x.png"
            />
            <h3 className="text-2xl font-bold  text-white">acticFlow</h3>
          </div>
          <p className="text-gray-200 text-base">
            A group of companies, specialized in the field of software
            engineering, computer networks and telecommunications. TAC-TIC has
            today become a subsidiary of the New Ways Group, a group of
            companies, each specialized in a specific field.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-1/3">
          <b className="text-lg font-bold text-white">Contact</b>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <i className="fas fa-phone-alt mr-2 text-gray-400"></i>
              <p className="text-base"> +216 36 365 558</p>
            </div>
            <div className="flex items-center">
              <i className="fas fa-envelope mr-2 text-gray-400"></i>
              <p className="text-base"> contact@tac-tic.net</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center space-y-4 w-full md:w-1/3  ">
          <b className="text-lg font-bold text-white">Stay Informed</b>
          <div className="w-[173px] flex flex-row items-start justify-center px-6 ">
            {" "}
            <div className="flex flex-col   items-end justify-start  gap-[38px_0px]">
              <div className="flex flex-row justify-between gap-[30px]">
                <img
                  className="h-[46px] w-[46px] relative overflow-hidden "
                  alt="logo"
                  src="/facebook.svg"
                />
                <div className="h-[41px] w-[42px] relative">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full "
                    alt="logo"
                    src="/vector-1.svg"
                  />
                  <img
                    className="absolute top-[6.1px] left-[10.7px] w-[25.4px] h-[25px] "
                    alt="logo"
                    src="/vector-2.svg"
                  />
                </div>
              </div>
              <div className="flex flex-row  justify-between gap-[30px]">
                <div className="h-[42px] w-[42px] relative">
                  <img
                    className="absolute top-[0px] left-[0px] w-full h-full z-[1]"
                    alt=""
                    src="/vector-3.svg"
                  />
                  <img
                    className="absolute top-[10px] left-[9px] w-[23px] h-[22px] z-[2]"
                    loading="eager"
                    alt=""
                    src="/vector-4.svg"
                  />
                </div>
                <img
                  className="h-[40.3px] w-[42.9px] relative z-[1]"
                  loading="eager"
                  alt=""
                  src="/group.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-6 mt-6 border-t border-gray-600">
        <p className="text-sm">© 2024 TAC-TIC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default FooterHome;
