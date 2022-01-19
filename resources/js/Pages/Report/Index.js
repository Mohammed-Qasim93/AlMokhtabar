import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "../../Layouts/Authenticated";
import Pagination from "@/Components/Pagination";
import Footer from "../../Layouts/Footer";

export default function Index({ auth, report }) {
    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Patients" />
                <div className="mt-8 relative">
                    <p className="text-4xl text-center font-bold m-5">
                        Patients Report Table
                    </p>
                    <div className="flex justify-center flex-col">
                        <div className="absolute left-5  top-24 sm:left-72  ">
                            <Link
                                href="/create"
                                className="px-4 py-2  bg-gray-800  text-slate-100"
                            >
                                Create new
                            </Link>
                        </div>
                        {report.data.length > 0 ? (
                            <div className="flex flex-col capitalize text-center mt-20">
                                <div className="overflow-x-auto">
                                    <div className="py-2 inline-block  sm:px-6 lg:px-8">
                                        <div className="overflow-x-auto">
                                            <table className="">
                                                <thead className="border-b bg-gray-800 text-gray-200">
                                                    <tr className="">
                                                        <th className="px-4 py-3">
                                                            Id
                                                        </th>

                                                        <th className="px-4 py-3">
                                                            Patient name
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            Patientid
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            Age
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            Gender
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            visit Date
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            branch
                                                        </th>
                                                        <th className="px-4 py-3">
                                                            amount
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {report.data.map(
                                                        (item, index) => (
                                                            <tr
                                                                class="border-b bg-gray-300 "
                                                                key={index}
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                                    {item.id}
                                                                </td>

                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    <Link
                                                                        href={`/${item.id}/edit`}
                                                                    >
                                                                        {
                                                                            item.pname
                                                                        }
                                                                    </Link>
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.patientid
                                                                    }
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {item.age}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {item.gender ==
                                                                        "0"
                                                                        ? "Male"
                                                                        : "Female"}
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.visitdate
                                                                    }
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.branch
                                                                    }
                                                                </td>
                                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.amount
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
            <Footer />
        </>
    );
}
