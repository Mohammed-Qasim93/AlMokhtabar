import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import page1 from "/page_1.jpg";
import page2 from "/page_2.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Button from "../../Components/Button";
import moment from "moment";
import "moment/locale/en-gb";
import QRcode from "qrcode";
import { Inertia } from "@inertiajs/inertia";

export default function Print({ report, auth, errors, categories }) {
    const [qrcode, setQrcode] = React.useState("");
    const qrUrl = `${window.location.origin}/report/${report.id}`;

    useEffect(() => {
        QRcode.toDataURL(qrUrl).then((url) => {
            setQrcode(url);
        });
    }, []);

    const download = () => {
        const divToPrint = document.querySelector("#page");
        html2canvas(divToPrint, {
            scale: 1,
        })
            .then((canvas) => {
                const imgData = canvas.toDataURL("image/jpg");
                const imgWidth = 210;
                const pageHeight = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                let heightLeft = imgHeight;
                const doc = new jsPDF("p", "mm", "a4");

                let position = 0;
                doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight + 25);
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(
                        imgData,
                        "JPEG",
                        0,
                        position,
                        imgWidth,
                        imgHeight + 25
                    );
                    heightLeft -= pageHeight;
                }
                doc.save("download.pdf");
            })
            .then(() => {
                Inertia.visit("/");
            });
    };

    return (
        <div className="flex flex-col mt-4 items-center justify-center">
            <Button
                className="py-3 mt-4 bg-gray-800"
                handleClick={download}
                children={"Download as PDF"}
            />

            <div id="page">
                <div
                    className="page1 relative"
                    style={{
                        backgroundImage: `url(${page1})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",

                        width: "219mm",
                        height: "297mm",
                    }}
                >
                    <p className="absolute w-[100px] top-5 left-20 font-tajawal-extrabold capitalize text-sm text-center   ">
                        {report.branchar}
                    </p>
                    <p className="absolute w-[310px] top-40 left-8 font-tajawal-extrabold capitalize text-xl text-center   ">
                        {report.pname}
                    </p>
                    <p
                        style={{
                            top: "15.5rem",
                        }}
                        className="absolute w-[156px]  left-8 font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.visitnum}
                    </p>
                    <p
                        style={{
                            top: "15.8rem",
                            left: "12.2rem",
                        }}
                        className="absolute w-[50px]  font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.age}
                    </p>
                    <p
                        style={{
                            top: "15.5rem",
                        }}
                        className="absolute w-[55px]  left-72 font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.gender == "0" ? "Male" : "Female"}
                    </p>
                    <p
                        style={{
                            top: "8.7rem",
                            left: "26.5rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.created_at).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "8.7rem",
                            left: "39.5rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.collecteddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "10.9rem",
                            left: "38.5rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.priteddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "10.9rem",
                            left: "26.8rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.authenticateddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "14.4rem",
                            left: "35.3rem",
                        }}
                        className="absolute w-[216px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.clientid}
                    </p>
                    <p
                        style={{
                            top: "20.5rem",
                            left: "14.3rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.result == "0" ? "Negative" : "Positive"}
                    </p>
                    <p
                        style={{
                            top: "20.5rem",
                            left: "27.3rem",
                        }}
                        className="absolute w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.result == "0" ? "Negative" : "Positive"}
                    </p>
                    <div className="absolute left-16 bottom-28 h-40 w-32 flex flex-col items-center bg-gray-800  p-2 text-center rounded-lg">
                        <span className="text-lg  absolute -top-1 text-gray-200 ">
                            Scan me
                        </span>
                        <img
                            src={qrcode}
                            alt=""
                            className="rounded-lg absolute w-28 bottom-3"
                        />
                    </div>
                </div>
                <div
                    className="page2 relative"
                    style={{
                        backgroundImage: `url(${page2})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "219mm",
                        height: "297mm",
                    }}
                >
                    <p
                        style={{
                            top: "4.5rem",
                        }}
                        className="absolute w-[100px] right-4 font-tajawal-extrabold capitalize text-xs text-center  "
                    >
                        {report.branch}
                    </p>
                    <p className="absolute w-[245px] top-24 left-8 font-tajawal-extrabold capitalize text-sm text-center   ">
                        {report.pname}
                    </p>
                    <p
                        style={{
                            top: "9.5rem",
                        }}
                        className="absolute w-[100px]  left-8 font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.visitnum}
                    </p>
                    <p
                        style={{
                            top: "9.5rem",
                            left: "8.2rem",
                        }}
                        className="absolute w-[30px]   font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.age}
                    </p>
                    <p
                        style={{
                            top: "9.5rem",
                        }}
                        className="absolute w-[85px]  left-48 font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.patientid}
                    </p>
                    <p
                        style={{
                            top: "4.3rem",
                            left: "21.5rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.visitdate).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "5.6rem",
                            left: "21.5rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center "
                    >
                        {moment(report.resultdate).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "4.3rem",
                            left: "32.5rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {moment(report.paymentdate).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "5.5rem",
                            left: "32.5rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.receiptno}
                    </p>

                    <p
                        style={{
                            top: "14.3rem",
                            left: "39.3rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "13.9rem",
                            left: "18.3rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "14.9rem",
                            left: "18.3rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.paymentusername}
                    </p>
                    <p
                        style={{
                            top: "16.1rem",
                            left: "18.3rem",
                        }}
                        className="absolute w-[200px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.paymentdate}
                    </p>
                    <p
                        style={{
                            top: "16.7rem",
                            left: "39.3rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "17.5rem",
                            left: "39.3rem",
                        }}
                        className="absolute w-[100px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "18rem",
                            left: "5.3rem",
                        }}
                        className="absolute flex items-center justify-center gap-x-4  w-[150px] font-tajawal-extrabold capitalize text-sm text-center  "
                    >
                        <span>جنيهاً</span>
                        <span>{report.amount}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
