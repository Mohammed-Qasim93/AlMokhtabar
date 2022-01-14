import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Logo from "/logo.png";
import page1 from "/page_1.jpg";

export default function Welcome(props) {
    const downloadPDF = () => {
        const input = document.getElementById("content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png", 1.0);
            const pdf = new jsPDF("p", "px", "a4");
            pdf.addImage(imgData, "JPEG", 0, 0);

            pdf.save("download.pdf");
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center    sm:pt-0">
                <div className="w-full max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 xl:py-20">
                    <div
                        id="content"
                        style={{
                            backgroundImage: `url(${page1})`,
                            backgroundSize: "cover",
                            width: "21cm",
                            minHeight: "29.7cm",
                            padding: "2cm",
                            margin: "1cm auto",
                        }}
                    >
                        <button onClick={downloadPDF}>ojpj</button>
                    </div>
                </div>
            </div>
        </>
    );
}
