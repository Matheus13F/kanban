"use client";

import { FormEvent, Fragment, useRef } from "react";
import Image from "next/image";
import { TaskTypeRadioGroup } from "./TaskTypeRadioGroup";

import { PhotoIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import { useBoardStore } from "@/store/BoardStore";

export default function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const { closeModal, isOpen } = useModalStore((state) => state);
  const {
    newTaskInput,
    setNewTaskInput,
    setImage,
    image,
    addTask,
    newTaskType,
  } = useBoardStore((state) => state);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!newTaskInput) return;

    addTask(newTaskInput, newTaskType, image);
    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onClose={closeModal}
        as="form"
        className="relative z-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className=" fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6
              text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2"
                >
                  Adicionar tarefa
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(e) => setNewTaskInput(e.target.value)}
                    placeholder="Adicionar a tarefa aqui..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                  />
                </div>

                <TaskTypeRadioGroup />

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => imagePickerRef.current?.click()}
                    className="w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    <PhotoIcon className="h-6 w-6 mr-2 inline-block" />
                    Upload Image
                  </button>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="uploaded image"
                      width={200}
                      height={200}
                      className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-130 cursor-not-allowed"
                      onClick={() => {
                        setImage(null);
                      }}
                    />
                  )}
                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={(e) => {
                      if (!e.target.files![0].type.startsWith("image/")) return;
                      setImage(e.target.files![0]);
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    disabled={!newTaskInput}
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium
                    text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible::ring-blue-500 focus-visible:ring-offset-2
                    disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    Nova Tarefa
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
