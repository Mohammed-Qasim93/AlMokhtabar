import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "../../Layouts/Authenticated";
import Button from "@/Components/Button";

export default function Index({ auth, report }) {
    console.log(report);
    return (
        <Authenticated auth={auth}>
            <Head title="Patients" />
            <div className="mt-8">
                <p className="text-4xl text-center font-bold m-5">
                    Patients Report Table
                </p>
                <div className="flex justify-center flex-col  mx-auto">
                    <div className="w-5/6 mx-auto">
                        <Link
                            href="/create"
                            className="px-4 py-2 bg-gray-800 rounded-lg text-slate-100"
                        >
                            Create new
                        </Link>
                    </div>
                    {report.data.length > 0 ? (
                        <table className="m-5 w-5/6 mx-auto shadow-sm  rounded-t-lg overflow-hidden  border-gray-600 bg-gray-200 text-gray-700">
                            <thead className="bg-gray-600 text-center capitalize  text-gray-200 ">
                                <tr className="">
                                    <th className="px-4 py-3">Id</th>
                                    <th className="px-4 py-3">Patient name</th>
                                    <th className="px-4 py-3">Patientid</th>
                                    <th className="px-4 py-3">Age</th>
                                    <th className="px-4 py-3">Gender</th>
                                    <th className="px-4 py-3">visit Date</th>
                                    <th className="px-4 py-3">branch</th>
                                    <th className="px-4 py-3">amount</th>
                                </tr>
                            </thead>
                            <tbody className="capitalize ">
                                {report.data.map((item, index) => {
                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="px-4 py-3">
                                                {item.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.pname}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.patientid}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.age}
                                            </td>
                                            <td className="px-4 flex justify-center  py-3">
                                                {item.gender == 1 ? (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        className="bi w-6 h-6 bi-gender-male"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                                                        />
                                                    </svg>
                                                ) : (
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        className="h-6 w-6 bi bi-gender-female"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                                                        />
                                                    </svg>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.visitdate}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.branch}
                                            </td>
                                            <td className="px-4 py-3">
                                                {item.amount}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center">
                            <p className="text-xl text-center font-bold m-5">
                                No Patients Yet
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Authenticated>
    );
}
