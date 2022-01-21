import React, { useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "../../Layouts/Authenticated";
import Pagination from "@/Components/Pagination";
import Footer from "../../Layouts/Footer";
import Toast from "@/Components/Toast";

export default function Index({ auth, report, success }) {
    useEffect(() => {
        if (success) {
            Toast.fire({
                icon: success.icon,
                title: success.title,
                text: success.message,
            });
        }
    }, [success]);

    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Patients" />
                <div className="mt-8 relative pb-4">
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
                                                        <th className="px-4 py-3">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {report.data.map(
                                                        (item, index) => (
                                                            <tr
                                                                className="border-b bg-gray-300 "
                                                                key={index}
                                                            >
                                                                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                                                                    {item.id}
                                                                </td>

                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {item.pname}
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.patientid
                                                                    }
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {item.age}
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {item.gender ==
                                                                    "0"
                                                                        ? "Male"
                                                                        : "Female"}
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.s2date
                                                                    }
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.branch
                                                                    }
                                                                </td>
                                                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                                    {
                                                                        item.amount
                                                                    }
                                                                </td>
                                                                <td className="text-base text-gray-900 flex items-center gap-4 justify-around font-light px-6 py-4 whitespace-nowrap">
                                                                    <Link
                                                                        href={`/print?id=${item.patientid}`}
                                                                        className=" bg-white p-1  rounded-md"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="red"
                                                                            className="bi bi-file-pdf w-6 h-6"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                                                                            <path d="M4.603 12.087a.81.81 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.68 7.68 0 0 1 1.482-.645 19.701 19.701 0 0 0 1.062-2.227 7.269 7.269 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a10.954 10.954 0 0 0 .98 1.686 5.753 5.753 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.856.856 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.716 5.716 0 0 1-.911-.95 11.642 11.642 0 0 0-1.997.406 11.311 11.311 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.793.793 0 0 1-.58.029zm1.379-1.901c-.166.076-.32.156-.459.238-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361.01.022.02.036.026.044a.27.27 0 0 0 .035-.012c.137-.056.355-.235.635-.572a8.18 8.18 0 0 0 .45-.606zm1.64-1.33a12.647 12.647 0 0 1 1.01-.193 11.666 11.666 0 0 1-.51-.858 20.741 20.741 0 0 1-.5 1.05zm2.446.45c.15.162.296.3.435.41.24.19.407.253.498.256a.107.107 0 0 0 .07-.015.307.307 0 0 0 .094-.125.436.436 0 0 0 .059-.2.095.095 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a3.881 3.881 0 0 0-.612-.053zM8.078 5.8a6.7 6.7 0 0 0 .2-.828c.031-.188.043-.343.038-.465a.613.613 0 0 0-.032-.198.517.517 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822.024.111.054.227.09.346z" />
                                                                        </svg>
                                                                    </Link>
                                                                    <Link
                                                                        href={`/edit/${item.id}`}
                                                                        className="bg-green-500 rounded-md p-1"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="#fff"
                                                                            className="bi bi-pencil-square h-6 w-6"
                                                                            viewBox="0 0 16 16"
                                                                        >
                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                                            />
                                                                        </svg>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <Pagination
                                            firstPageUrl={report.first_page_url}
                                            lastPageUrl={report.last_page_url}
                                            nextPage={report.next_page_url}
                                            prevPage={report.prev_page_url}
                                            perPage={report.perPage}
                                            to={report.to}
                                            total={report.data.length}
                                            currentPage={report.current_page}
                                            path={report.path}
                                            lastPage={report.last_page}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center mt-28">
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
