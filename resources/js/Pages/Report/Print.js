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
        QRcode.toDataURL(qrUrl)
            .then((url) => {
                setQrcode(url);
            })
            .then(() => {
                download();
            });
    }, []);

    const download = () => {
        const divToPrint = document.querySelector("#page");
        html2canvas(divToPrint).then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            const doc = new jsPDF("p", "mm", "A4");

            let position = 0;
            doc.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save("download.pdf");
        });
    };

    return (
        <div className="flex flex-col mt-4 items-center justify-center">
            <div id="page" className="">
                {/* <div
                    className="page1 relative"
                    style={{
                        backgroundImage: `url(${page1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        imageResolution: "700dpi",
                        width: "2480px",
                        height: "3500px",
                    }}
                >
                    <p
                        style={{
                            top: "4.5rem",
                            left: "8.1rem",
                        }}
                        className="absolute  w-[300px]   font-tajawal-extrabold capitalize text-4xl text-right   "
                    >
                        {report.branchar}
                    </p>
                    <p
                        style={{
                            top: "32rem",
                            left: "4rem",
                            lineHeight: "1.5",
                        }}
                        className="absolute w-[940px] bg-red-400 font-tajawal-extrabold capitalize text-7xl text-left   "
                    >
                        {report.pname}
                    </p>
                    <p
                        style={{
                            top: "50rem",
                            left: "2.5rem",
                        }}
                        className="absolute w-[500px] bg-red-400  left-8 font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {report.visitnum}
                    </p>
                    <p
                        style={{
                            top: "49.6rem",
                            left: "32.2rem",
                        }}
                        className="absolute w-[150px]  font-tajawal-extrabold capitalize text-5xl text-right  "
                    >
                        {report.age}
                    </p>
                    <p
                        style={{
                            top: "49.6rem",
                            left: "53.2rem",
                        }}
                        className="absolute w-[160px] bg-red-300  font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {report.gender == "0" ? "Male" : "Female"}
                    </p>
                    <p
                        style={{
                            top: "28.2rem",
                            left: "82rem",
                        }}
                        className="absolute  w-[400px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {moment(report.created_at).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "28.2rem",
                            right: "10.2rem",
                        }}
                        className="absolute w-[400px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {moment(report.collecteddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "35rem",
                            right: "10.2rem",
                        }}
                        className="absolute  w-[400px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {moment(report.priteddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "35rem",
                            left: "82rem",
                        }}
                        className="absolute w-[400px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {moment(report.authenticateddate).format(
                            "DD/MM/YYYY hh:mm:ss"
                        )}
                    </p>
                    <p
                        style={{
                            top: "46.5rem",
                            right: "5.4rem",
                        }}
                        className="absolute bg-blue-700 w-[680px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {report.clientid}
                    </p>
                    <p
                        style={{
                            top: "70rem",
                            left: "35rem",
                        }}
                        className="absolute bg-blue-700 w-[680px] font-tajawal-extrabold capitalize text-4xl text-center  "
                    >
                        {report.result == "0" ? "Negative" : "Positive"}
                    </p>
                    <p
                        style={{
                            top: "70rem",
                            left: "76.4rem",
                        }}
                        className="absolute bg-blue-700 w-[680px] font-tajawal-extrabold capitalize text-4xl text-center  "
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
                </div> */}
                <div
                    className="page2 relative"
                    style={{
                        backgroundImage: `url(${page2})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        imageResolution: "700dpi",
                        width: "2480px",
                        height: "3400px",
                    }}
                >
                    <p
                        style={{
                            top: "11.7rem",
                            right: "5.5rem",
                        }}
                        className="absolute  w-[140px] font-tajawal-extrabold capitalize text-3xl text-left  "
                    >
                        {report.branch}
                    </p>
                    <p
                        style={{
                            top: "15.5rem",
                            left: "4rem",
                            lineHeight: "1.5",
                        }}
                        className="absolute bg-gray-500  w-[740px] font-tajawal-extrabold capitalize text-5xl text-left  "
                    >
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
