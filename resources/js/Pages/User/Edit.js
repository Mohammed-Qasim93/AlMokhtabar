import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import Button from "@/Components/Button";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import Checkbox from "@/Components/Checkbox";
// import ComboBox from "@/Components/ComboBox";

export default function Edit({ auth, user, errors, success }) {
    console.log(user);
    let { data, setData, post } = useForm({
        name: user.name || "",
        email: user.email || "",
        password: "",
        password_confirmation: "",
        isAdmin: user.isAdmin,
        _method: "PUT",
    });
    // let [userState, setUserState] = useState(initialState);
    // let { email, name, isAdmin, password, password_confirmation } = userState;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // const handelClick = (e) => {
    //     e.preventDefault();
    //     Inertia.post(`/user/${user.id}`, data);
    // };

    const submit = (e) => {
        e.preventDefault();

        post(`/user/${user.id}`);
    };

    const handlechecked = (e) => {
        if (data.isAdmin == "1") {
            setData({ ...data, isAdmin: "0" });
        } else {
            setData({ ...data, isAdmin: "1" });
        }
    };
    return (
        <Authenticated auth={auth}>
            <Head title={`Edit  ${user.name}  `} />
            <div className="flex">
                <div className="flex-1 flex flex-col ">
                    <div className=" flex justify-center  text-gray-900 text-2xl">
                        <div className="pt-12" style={{ width: "512px" }}>
                            <form
                                onSubmit={submit}
                                className="w-full mx-auto border-2 bg-white p-8 space-y-6"
                            >
                                <h2 className="text-center text-3xl py-4 text-gray-600">
                                    Edit User
                                </h2>
                                <div className="">
                                    <Label
                                        className="text-xl w-full pb-2"
                                        forInput="name"
                                        value="Username"
                                    />
                                    <Input
                                        type="text"
                                        className="p-2 w-full text-center"
                                        name="name"
                                        handleChange={handleChange}
                                        value={data.name}
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.name}
                                </small>

                                <div className="">
                                    <Label
                                        className="text-xl  pb-2"
                                        forInput="email"
                                        value="Email"
                                    />
                                    <Input
                                        type="email"
                                        name="email"
                                        handleChange={handleChange}
                                        value={data.email}
                                        className="p-2 w-full text-center"
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.email}
                                </small>
                                {auth.user.isAdmin == "1" && user.id !== 1 && (
                                    <div className="flex items-center h-10 w-1/2 text-gray-900">
                                        <Input
                                            name="isAdmin"
                                            type="checkbox"
                                            value={data.isAdmin}
                                            handleChange={handlechecked}
                                            className="w-6 h-6"
                                            checked={data.isAdmin}
                                        />
                                        <Label
                                            forInput="isAdmin"
                                            className="text-xl px-4 "
                                            value="Make Admin"
                                        />
                                    </div>
                                )}

                                <div className="">
                                    <Label
                                        className="text-xl pb-2"
                                        forInput="password"
                                        value="Password"
                                    />
                                    <Input
                                        type="password"
                                        name="password"
                                        handleChange={handleChange}
                                        value={data.password}
                                        className="p-2 text-center w-full placeholder-gray-400"
                                        placeholder="Leave empty to not change"
                                    />
                                </div>
                                <div className="">
                                    <Label
                                        className="text-xl pb-2"
                                        forInput="password_confirmation"
                                        value="Password Confirm"
                                    />
                                    <Input
                                        name="password_confirmation"
                                        type="password"
                                        handleChange={handleChange}
                                        value={data.password_confirmation}
                                        className="p-2 text-center w-full placeholder-gray-400"
                                        placeholder="Leave empty to not change"
                                    />
                                </div>
                                <small className="text-red-500 text-base">
                                    {errors.password}
                                </small>

                                <div className="flex justify-center">
                                    <Button className="bg-green-500 py-2 rounded-md">
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
