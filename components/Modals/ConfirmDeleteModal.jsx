import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Spinner from "../Spinner";

const ConfirmDeleteModal = ({
  onConfirm,
  title,
  loading,
  hide = false,
  type = "icon",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {type === "button" ? (
        <button
          onClick={() => setOpen(true)}
          disabled={disabled}
          className="px-4 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Delete
        </button>
      ) : type === "text" ? (
        <div
          className="flex items-center cursor-pointer hover:text-red-600"
          onClick={() => !disabled && setOpen(true)}
        >
          <FiTrash2 className="mr-2 text-red-600 text-sm" />
          <span>Delete</span>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          disabled={disabled}
          className="text-red-600 hover:text-red-700 mt-2"
        >
          <FiTrash2 size={18} />
        </button>
      )}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={`fixed inset-0 z-50 flex ${
          open ? "bg-black/20" : ""
        } items-center justify-center p-4`}
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <div className="flex flex-row items-center mb-4">
            <AiOutlineWarning className="text-red-600 mr-2" size={48} />
            <h2 className="text-base text-gray-800 ml-2">
              Are you sure you want to delete {title}?
            </h2>
          </div>
          <div className="flex justify-end space-x-3 mt-8">
            <button
              onClick={() => setOpen(false)}
              className="flex items-center px-4 py-2 text-sm  border border-black rounded-md hover:bg-gray-100 text-black"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                if (open) setOpen(false);
              }}
              className="flex items-center px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              {loading ? (
                <>
                  <Spinner loading={true} />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmDeleteModal;
