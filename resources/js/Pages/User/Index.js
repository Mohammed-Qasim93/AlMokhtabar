import React, { useEffect } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Authenticated from "../../Layouts/Authenticated";
import Footer from "../../Layouts/Footer";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { Toast } from "@/Components/Toast";

export default function Index({ auth, user, success }) {
    useEffect(() => {
        if (success) {
            Toast.fire({
                icon: success.icon,
                title: success.title,
                text: success.message,
            });
        }
    }, [success]);

    const handleClick = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showDenyButton: true,
            confirmButtonText: "Yes, delete it!",
            denyButtonText: `No, cancel!`,
        }).then((result) => {
            if (result.isConfirmed) {
                Inertia.delete(`/user/${id}`);
            }
        });
    };
    return (
        <>
            <Authenticated auth={auth}>
                <Head title="Users" />
                <div className="mt-8 relative">
                    <p className="text-4xl text-center font-bold m-5">
                        Users Table
                    </p>
                    <div className="flex justify-center flex-col">
                        <div className="absolute left-5  top-24 sm:left-72  ">
                            <Link
                                href="/register"
                                className="px-4 py-2 sm:ml-[11.2rem] bg-gray-800  text-slate-100"
                            >
                                Create new user
                            </Link>
                        </div>
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
                                                        user name
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        email
                                                    </th>
                                                    <th className="px-4 py-3">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.map((item, index) => (
                                                    <tr
                                                        className="border-b bg-gray-300 "
                                                        key={index}
                                                    >
                                                        <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                                                            {item.id}
                                                        </td>

                                                        <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {item.name}
                                                        </td>
                                                        <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {item.email}
                                                        </td>

                                                        <td className="text-base text-gray-900 flex items-center gap-4 justify-around font-light px-6 py-4 whitespace-nowrap">
                                                            <Link
                                                                href={`/user/${item.id}/edit`}
                                                                className="bg-green-500 rounded-md p-2"
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
                                                            <button
                                                                onClick={() =>
                                                                    handleClick(
                                                                        item.id
                                                                    )
                                                                }
                                                                className={` px-2 py-2 transition duration-500 ease-in-out bg-red-500 hover:bg-red-600
                                             text-white p-2 rounded-lg mx-2 
                                               `}
                                                            >
                                                                <svg
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="red"
                                                                    viewBox="0 0 24 24"
                                                                    className="h-6 w-6"
                                                                    stroke="#fff"
                                                                >
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth={
                                                                            2
                                                                        }
                                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                    />
                                                                </svg>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Authenticated>
            <Footer />
        </>
    );
}
