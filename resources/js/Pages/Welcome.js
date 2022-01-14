import React from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Welcome(props) {
    const downloadPDF = () => {
        const input = document.getElementById("pdf-content");
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 0, 0);

            pdf.save("download.pdf");
        });
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div id="content">هلووو</div>
                <button onClick={downloadPDF}>ojpj</button>
            </div>
        </>
    );
}
