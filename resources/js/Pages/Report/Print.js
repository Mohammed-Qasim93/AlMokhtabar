import React, { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/inertia-react";

import Authenticated from "@/Layouts/Authenticated";
import page1 from "/page_1.jpg";
import page2 from "/page_2.jpg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Print({ report, auth, errors, categories }) {
    console.log(report);
    const download = () => {
        const divToPrint = document.querySelector("#page");
        html2canvas(divToPrint).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            const doc = new jsPDF("p", "mm", "a4");
            let position = 0;
            doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight + 25);
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(
                    imgData,
                    "PNG",
                    0,
                    position,
                    imgWidth,
                    imgHeight + 25
                );
                heightLeft -= pageHeight;
            }
            doc.save("download.pdf");
            setLoader(false);
        });
    };

    return (
        <div className="flex justify-center">
            <div className="relative" id="page">
                <div
                    className="page1"
                    style={{
                        backgroundImage: `url(${page1})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "219mm",
                        height: "297mm",
                    }}
                ></div>
                <div
                    className="page2"
                    style={{
                        backgroundImage: `url(${page2})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "219mm",
                        height: "297mm",
                    }}
                ></div>
            </div>
            <button className="absolute" onClick={download}>
                ijoij
            </button>
        </div>
    );
}
