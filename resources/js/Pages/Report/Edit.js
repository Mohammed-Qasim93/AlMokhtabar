import React from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";

import Combo from "../../Components/Combo";
import { Inertia } from "@inertiajs/inertia";
import Footer from "../../Layouts/Footer";
import moment from "moment";

export default function Add({ auth, errors, report }) {
    const { data, setData, post } = useForm({
        pname: report.pname || "",
        age: report.age || "",
        gender: report.gender,
        s1date: report.s1date || "",
        s2date: report.s2date || "",
        result: report.result,
        branch: report.branch || "",
        branchar: report.branchar || "",
        customer: report.customer || "",
        amount: report.amount || "",
        paymentusername: report.paymentusername || "",
        _method: "PUT",
    });

    console.log(data);
    let genderArr = [
        {
            name: "Male",
        },
        {
            name: "Female",
        },
    ];
    let resultArr = [
        {
            name: "Negative",
        },
        {
            name: "Positive",
        },
    ];

    const onHandleChange = (event) => {
        setData(
            event.target.name,
            event.target.type === "checkbox"
                ? event.target.checked
                : event.target.value
        );
    };

    const back = () => {
        Inertia.get("/");
    };

    const submit = (e) => {
        e.preventDefault();

        post(`/update/${report.id}`);
    };

    return (
        <>
            <Authenticated auth={auth} errors={errors}>
                <Head title="Edit Report" />
                <div className="flex">
                    <div className="flex-1 flex flex-col">
                        <div className=" flex justify-center  text-gray-900 text-2xl">
                            <div className="pt-12">
                                <div>
                                    <div className="mt-10 sm:mt-0">
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="mt-5 md:mt-0 col-span-2">
                                                <form onSubmit={submit}>
                                                    <div className="shadow overflow-hidden sm:rounded-md">
                                                        <div className="px-4 py-5 bg-white sm:p-6">
                                                            <h2 className="pt-4 pb-6 text-center capitalize">
                                                                Edit{" "}
                                                                {report.pname +
                                                                    "'s"}{" "}
                                                                Report
                                                            </h2>
                                                            <div className="grid grid-cols-3 gap-6">
                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="pname"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Pateint
                                                                        Name{" "}
                                                                    </label>
                                                                    <Input
                                                                        handleChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        name="pname"
                                                                        value={
                                                                            data.pname
                                                                        }
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.pname
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="age"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Age
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="number"
                                                                        min={1}
                                                                        value={
                                                                            data.age
                                                                        }
                                                                        name="age"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.age
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="gender"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Gender
                                                                    </label>
                                                                    <Combo
                                                                        className="w-full rounded-lg"
                                                                        name="gender"
                                                                        value={
                                                                            data.gender
                                                                        }
                                                                        options={
                                                                            genderArr
                                                                        }
                                                                        handleChange={(
                                                                            e
                                                                        ) => {
                                                                            onHandleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.gender
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="customer"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Customer
                                                                    </label>
                                                                    <input
                                                                        className="w-full rounded-lg"
                                                                        name="customer"
                                                                        type="text"
                                                                        value={
                                                                            data.customer
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            onHandleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.customer
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="s2date"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Visit
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={moment(
                                                                            data.s2date
                                                                        ).format(
                                                                            "YYYY-MM-DDTHH:mm"
                                                                        )}
                                                                        name="s2date"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.s2date
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="s1date"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Result
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={moment(
                                                                            data.s1date
                                                                        ).format(
                                                                            "YYYY-MM-DDTHH:mm"
                                                                        )}
                                                                        name="s1date"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.s1date
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="result"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Result
                                                                    </label>
                                                                    <Combo
                                                                        className="w-full rounded-lg"
                                                                        name="result"
                                                                        value={
                                                                            data.result
                                                                        }
                                                                        options={
                                                                            resultArr
                                                                        }
                                                                        handleChange={(
                                                                            e
                                                                        ) => {
                                                                            onHandleChange(
                                                                                e
                                                                            );
                                                                        }}
                                                                    />
                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.result
                                                                        }
                                                                    </small>
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="branchar"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Branch
                                                                        In
                                                                        Arabic
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        value={
                                                                            data.branchar
                                                                        }
                                                                        name="branchar"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.branchar
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="branch"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Branch
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        value={
                                                                            data.branch
                                                                        }
                                                                        name="branch"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.branch
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="amount"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Amount
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="number"
                                                                        min={1}
                                                                        value={
                                                                            data.amount
                                                                        }
                                                                        name="amount"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.amount
                                                                        }
                                                                    </small>
                                                                </div>

                                                                <div className="col-span-6 sm:col-span-3">
                                                                    <label
                                                                        htmlFor="paymentusername"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Payment
                                                                        User
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="text"
                                                                        value={
                                                                            data.paymentusername
                                                                        }
                                                                        name="paymentusername"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.paymentusername
                                                                        }
                                                                    </small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-4 py-3 flex justify-evenly bg-gray-50 text-right sm:px-6">
                                                            <Button
                                                                type="button"
                                                                handleClick={
                                                                    back
                                                                }
                                                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none "
                                                            >
                                                                Back
                                                            </Button>
                                                            <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none ">
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
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
