import React, { useEffect } from "react";

import page1 from "/images/page_1.jpg";
import page2 from "/images/page_2.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ApplicationLogo from "../../Components/ApplicationLogo";
import moment from "moment";
import "moment/locale/en-gb";
import QRcode from "qrcode";
import Button from "../../Components/Button";
import { Inertia } from "@inertiajs/inertia";

export default function Print({ report }) {
    const [qrcode, setQrcode] = React.useState("");
    const qrUrl = `${window.location.origin}/result?id=${report.patientid}`;

    useEffect(() => {
        QRcode.toDataURL(qrUrl).then((url) => {
            setQrcode(url);
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
            doc.save(`${report.pname}_${moment().format("DD-MM-YYYY")}.pdf`);
        });
    };

    return (
        <div className="flex flex-col mt-4 items-center font-sans justify-center">
            <div
                style={{
                    width: "100%",
                    height: "100vh",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: "10000",
                }}
                className="loader"
            >
                <div className="m-5">
                    <Button className="text-xl" handleClick={download}>
                        Download Result
                    </Button>
                </div>

                <ApplicationLogo className="w-[20rem] h-20" />
            </div>
            <div id="page" className="">
                <div
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
                        className="absolute  w-[300px]  font-serif font-bold  capitalize text-4xl text-right   "
                    >
                        {report.branchar}
                    </p>
                    <p
                        style={{
                            top: "30rem",
                            left: "4rem",
                            lineHeight: "1.5",
                        }}
                        className="absolute w-[940px]  capitalize text-[2.8rem] font-serif text-left   "
                    >
                        {report.pname}
                    </p>
                    <p
                        style={{
                            top: "50rem",
                            left: "2.5rem",
                        }}
                        className="absolute w-[500px]  left-8  capitalize text-4xl text-center  "
                    >
                        {report.visitnum}
                    </p>
                    <p
                        style={{
                            top: "49.6rem",
                            left: "32.2rem",
                        }}
                        className="absolute w-[150px]   capitalize text-5xl text-right  "
                    >
                        {report.age}
                    </p>
                    <p
                        style={{
                            top: "49.6rem",
                            left: "53.2rem",
                        }}
                        className="absolute w-[160px]   capitalize text-4xl text-center  "
                    >
                        {report.gender == "0" ? "Male" : "Female"}
                    </p>
                    <p
                        style={{
                            top: "28.2rem",
                            left: "82rem",
                        }}
                        className="absolute  w-[400px]  capitalize text-4xl text-center  "
                    >
                        {moment(report.s2date).format("DD/MM/YYYY hh:mm:ss")}
                    </p>
                    <p
                        style={{
                            top: "28.2rem",
                            right: "10.2rem",
                        }}
                        className="absolute w-[400px] capitalize text-4xl text-center  "
                    >
                        {moment(report.s2date).format("DD/MM/YYYY hh:mm:ss")}
                    </p>
                    <p
                        style={{
                            top: "35rem",
                            right: "10.2rem",
                        }}
                        className="absolute  w-[400px]  capitalize text-4xl text-center  "
                    >
                        {moment(report.s1date).format("DD/MM/YYYY hh:mm:ss")}
                    </p>
                    <p
                        style={{
                            top: "35rem",
                            left: "82rem",
                        }}
                        className="absolute w-[400px]  capitalize text-4xl text-center  "
                    >
                        {moment(report.s1date).format("DD/MM/YYYY hh:mm:ss")}
                    </p>
                    <p
                        style={{
                            top: "46.5rem",
                            right: "5.4rem",
                        }}
                        className="absolute  w-[680px]  capitalize text-4xl text-center  "
                    >
                        {report.clientid}
                    </p>
                    <p
                        style={{
                            top: "70rem",
                            left: "35rem",
                        }}
                        className="absolute w-[680px]  capitalize text-4xl text-center  "
                    >
                        {report.result == "0" ? "Negative" : "Positive"}
                    </p>
                    <p
                        style={{
                            top: "70rem",
                            left: "76.4rem",
                        }}
                        className="absolute w-[680px]  capitalize text-4xl text-center  "
                    >
                        {report.result == "0" ? "Negative" : "Positive"}
                    </p>
                    <div
                        style={{
                            padding: "10rem",
                            bottom: "25rem",
                            left: "13rem",
                        }}
                        className="absolute   h-[26rem] w-80 flex flex-col items-center bg-gray-800  text-center rounded-3xl"
                    >
                        <span className="text-6xl  absolute -top-1 text-gray-200 ">
                            Scan me
                        </span>
                        <img
                            src={qrcode}
                            alt=""
                            className="rounded-3xl absolute w-72 bottom-3"
                        />
                    </div>
                </div>
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
                            top: "15rem",
                            right: "12.5rem",
                        }}
                        className="absolute  w-[200px]  capitalize text-3xl text-center "
                    >
                        {report.branch}
                    </p>
                    <p
                        style={{
                            top: "14.2rem",
                            left: "4rem",
                            fontSize: "2rem",
                            lineHeight: "1.5",
                        }}
                        className="absolute  w-[740px]  capitalize  font-serif text-left  "
                    >
                        {report.pname}
                    </p>
                    <p
                        style={{
                            top: "27.2rem",
                            left: "3.8rem",
                        }}
                        className="absolute   w-[300px]  capitalize text-5xl text-center  "
                    >
                        {report.visitnum}
                    </p>
                    <p
                        style={{
                            top: "27.2rem",
                            left: "23.8rem",
                        }}
                        className="absolute   w-[80px]  capitalize text-5xl text-center  "
                    >
                        {report.age}
                    </p>
                    <p
                        style={{
                            top: "27.2rem",
                            left: "35rem",
                        }}
                        className="absolute  w-[250px]  capitalize text-5xl text-center  "
                    >
                        {report.patientid}
                    </p>
                    <p
                        style={{
                            top: "11.3rem",
                            left: "64rem",
                        }}
                        className="absolute w-[300px]   capitalize text-4xl text-center  "
                    >
                        {moment(report.s2date).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "15.4rem",
                            left: "64rem",
                        }}
                        className="absolute w-[300px] capitalize text-4xl text-center "
                    >
                        {moment(report.s1date).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "11.3rem",
                            right: "35rem",
                        }}
                        className="absolute w-[300px] capitalize text-4xl text-center  "
                    >
                        {moment(report.s2date).format("ll")}
                    </p>
                    <p
                        style={{
                            top: "14.8rem",
                            right: "35rem",
                        }}
                        className="absolute w-[300px]   capitalize text-4xl text-center  "
                    >
                        {report.receiptno}
                    </p>
                    <p
                        style={{
                            top: "24rem",
                            right: "6rem",
                        }}
                        className="absolute w-[630px]   capitalize text-4xl text-center  "
                    >
                        {report.customer}
                    </p>

                    <p
                        style={{
                            top: "43rem",
                            right: "24rem",
                        }}
                        className="absolute w-[150px]   capitalize text-4xl text-right  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "50rem",
                            right: "24rem",
                        }}
                        className="absolute w-[150px]   capitalize text-4xl text-right  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "53rem",
                            right: "24rem",
                        }}
                        className="absolute w-[150px]   capitalize text-4xl text-right  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "45.4rem",
                            left: "35rem",
                        }}
                        className="absolute  w-[500px]  capitalize text-4xl text-left  "
                    >
                        {report.paymentusername}
                    </p>
                    <p
                        style={{
                            top: "49rem",
                            left: "35rem",
                        }}
                        className="absolute w-[500px] capitalize text-4xl text-left  "
                    >
                        {report.s2date}
                    </p>
                    <p
                        style={{
                            top: "41.8rem",
                            left: "35rem",
                        }}
                        className="absolute  w-[500px] capitalize text-4xl text-left  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "38rem",
                            right: "43rem",
                        }}
                        className="absolute w-[180px]  capitalize text-4xl text-center  "
                    >
                        {report.amount}
                    </p>
                    <p
                        style={{
                            top: "54rem",
                            left: "16rem",
                        }}
                        className="absolute w-[400px] flex items-center justify-end gap-x-4  capitalize text-5xl  "
                    >
                        <span>جنيهاً</span>
                        <span>{report.amount}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
