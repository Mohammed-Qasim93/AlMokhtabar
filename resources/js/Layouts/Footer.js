import React from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/inertia-react";

export default function Footer({ }) {
    return (
        <div className="h-64 flex  flex-col sm:justify-center items-center pt-6  sm:pt-0 bg-gray-100">
            <div className="w-full h-full flex flex-col justify-between px-6 py-4 bg-white shadow-md  overflow-hidden sm:rounded-lg">
                <div className="flex p-4 items-center justify-around">
                    <div className="flex flex-col justify-start">
                        <ApplicationLogo className="mx-auto w-[180px] h-[50px]" />
                        <div className="text-center">
                            <p>Love your self</p>
                            <p>
                                All rights reserved &copy; to Almokhtabar Labs{" "}
                                {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>

                </div>
                <div className=" border-t-2 w-full bottom-0">
                    <div className="flex p-4 justify-center items-center gap-x-1">
                        <p>Programmed & Developed by </p>
                        <a
                            className="text-blue-500 underline"
                            target="_blank"
                            href="https://horizondev-7ul7z3h2p-mohammed-qasim93.vercel.app/"
                        >
                            {" "}
                            HorizonDev{" "}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
