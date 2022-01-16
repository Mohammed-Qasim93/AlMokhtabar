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
                    <table className="m-5 w-5/6 mx-auto shadow-sm  rounded-t-lg overflow-hidden  border-gray-600 bg-gray-200 text-gray-700">
                        <thead className="bg-gray-600 text-center capitalize  text-gray-200 ">
                            <tr className="  ">
                                <th className="px-4 py-3">Patient name</th>
                                <th className="px-4 py-3">age</th>
                                <th className="px-4 py-3">gender</th>
                                <th className="px-4 py-3">result</th>
                                <th className="px-4 py-3">visit number</th>
                                <th className="px-4 py-3">branch</th>
                                <th className="px-4 py-3">amount</th>
                                <th className="px-4 py-3">payment</th>
                            </tr>
                        </thead>
                        <tbody className="capitalize ">
                            {report.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="px-4 py-3">
                                            {item.pname}
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.age}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Authenticated>
    );
}
