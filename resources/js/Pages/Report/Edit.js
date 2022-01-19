import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import Input from "@/Components/Input";
import Button from "@/Components/Button";
import Authenticated from "@/Layouts/Authenticated";

import Combo from "../../Components/Combo";
import { Inertia } from "@inertiajs/inertia";
import Footer from "../../Layouts/Footer";

export default function Add({ auth, errors, categories }) {
    const { data, setData, post } = useForm({
        pname: "",
        age: "",
        gender: "",
        visitdate: "",
        result: "",
        resultdate: "",
        collecteddate: "",
        printeddate: "",
        authenticateddate: "",
        registereddate: "",
        branch: "",
        branchar: "",
        amount: "",

        paymentusername: "",
        paymentdate: "",
    });

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
            name: "Positive",
        },
        {
            name: "Negative",
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

    // const submit = (e) => {
    //     e.preventDefault();
    //     Inertia.post(`/items`, data);
    // };

    const submit = (e) => {
        e.preventDefault();

        post("/store", {
            onFinish: () => {
                Inertia.visit("/print?print=pdf");
            },
        });
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setData({ ...data, [name]: value });
    // };

    // const handelClick = (e) => {
    //     e.preventDefault();
    //     axios.post("/items", data).then((response) => {
    //         if (response.status === 201) {
    //             Swal.fire({
    //                 title: "تمت العملية بنجاح",
    //                 icon: "success",
    //                 showConfirmButton: false,
    //                 timer: 1500,
    //             });
    //             Inertia.replace("/items");
    //         }
    //     });
    // };

    return (
        <>
            <Authenticated auth={auth} errors={errors}>
                <Head title="Create Report" />
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
                                                            <h2 className="pt-4 pb-6 text-center">
                                                                Create Report
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
                                                                        add={
                                                                            "true"
                                                                        }
                                                                        defaultValue={
                                                                            genderArr[0]
                                                                                .name
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
                                                                        htmlFor="visitdate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Visit
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="date"
                                                                        value={
                                                                            data.visitdate
                                                                        }
                                                                        name="visitdate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.visitdate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="resultdate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Result
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="date"
                                                                        value={
                                                                            data.resultdate
                                                                        }
                                                                        name="resultdate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.resultdate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="registereddate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Registered
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={
                                                                            data.registereddate
                                                                        }
                                                                        name="registereddate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.registereddate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="authenticateddate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Authenticated
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={
                                                                            data.authenticateddate
                                                                        }
                                                                        name="authenticateddate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.authenticateddate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="collecteddate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Collected
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={
                                                                            data.collecteddate
                                                                        }
                                                                        name="collecteddate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.collecteddate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="printeddate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Printed
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={
                                                                            data.printeddate
                                                                        }
                                                                        name="printeddate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.printeddate
                                                                        }
                                                                    </small>
                                                                </div>
                                                                <div className="col-span-6 sm:col-span-1">
                                                                    <label
                                                                        htmlFor="paymentdate"
                                                                        className="block text-sm font-medium text-gray-700"
                                                                    >
                                                                        Payment
                                                                        Date
                                                                    </label>
                                                                    <input
                                                                        onChange={
                                                                            onHandleChange
                                                                        }
                                                                        type="datetime-local"
                                                                        value={
                                                                            data.paymentdate
                                                                        }
                                                                        name="paymentdate"
                                                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                                                    />

                                                                    <small className="text-red-500 text-sm">
                                                                        {
                                                                            errors.paymentdate
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
                                                                        add={
                                                                            "true"
                                                                        }
                                                                        defaultValue={
                                                                            resultArr[1]
                                                                                .name
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
                                                                        type="text"
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

                                                                <div className="col-span-6 sm:col-span-2">
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
                                                        <div className="px-4 py-3 flex justify-center bg-gray-50 text-right sm:px-6">
                                                            <Button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none ">
                                                                Create
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
