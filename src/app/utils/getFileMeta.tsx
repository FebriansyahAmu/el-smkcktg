import { FaFilePdf, FaFileWord, FaImage, FaFileAlt } from "react-icons/fa";

export type FileMeta = {
  icon: JSX.Element;
  label: string;
  isImage?: boolean;
};

export function getFileMeta(fileUrl: string): FileMeta {
  const ext = fileUrl.split(".").pop()?.toLowerCase();

  if (!ext) {
    return {
      icon: <FaFileAlt className="text-gray-500 text-xl mr-3" />,
      label: "File",
    };
  }

  const map: Record<string, FileMeta> = {
    pdf: {
      icon: <FaFilePdf className="text-red-500 text-xl mr-3" />,
      label: "Dokumen PDF",
    },
    doc: {
      icon: <FaFileWord className="text-blue-500 text-xl mr-3" />,
      label: "Dokumen Word",
    },
    docx: {
      icon: <FaFileWord className="text-blue-500 text-xl mr-3" />,
      label: "Dokumen Word",
    },
    jpg: {
      icon: <FaImage className="text-green-500 text-xl mr-3" />,
      label: "Gambar",
      isImage: true,
    },
    jpeg: {
      icon: <FaImage className="text-green-500 text-xl mr-3" />,
      label: "Gambar",
      isImage: true,
    },
    png: {
      icon: <FaImage className="text-green-500 text-xl mr-3" />,
      label: "Gambar",
      isImage: true,
    },
  };

  return (
    map[ext] || {
      icon: <FaFileAlt className="text-gray-500 text-xl mr-3" />,
      label: "File",
    }
  );
}
