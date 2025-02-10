import React from "react";

export default ({ isOpen, onClose, mode, onSubmit }) => {

    return (
        <>
            <dialog id="my_modal_3" className="modal" open={isOpen}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg py-4">
                        {mode === 'edit' ? 'Edit Client' : 'Client Details'}
                    </h3>

                    <form method="dialog">
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Name
                            <input type="text" className="grow" />
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Email
                            <input type="text" className="grow" />
                        </label>
                        <label className="input input-bordered my-4 flex items-center gap-2">
                            Job
                            <input type="text" className="grow" />
                        </label>

                        <div className="flex mb-4 justify-between">
                            <label className="input input-bordered mr-4 my-4 flex items-center gap-2">
                                Rate
                                <input type="number" className="grow" />
                            </label>

                            <select className="select select-bordered w-full mt-4 max-w-xs">
                                <option>Inactive</option>
                                <option>Active</option>
                            </select>
                        </div>

                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>

                        <button className="btn btn-success">
                            {mode === 'edit' ? 'Save Changes' : 'Add Client'}
                        </button>
                    </form>
                </div>
            </dialog>
        </>
    )
}