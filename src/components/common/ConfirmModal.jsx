import React from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

const ConfirmModal = ({ isOpen, onClose, onClick }) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="text-white">
				<DialogHeader>
					<DialogTitle>
						<h3 className="text-2xl">Delete Project</h3>
					</DialogTitle>
				</DialogHeader>
				<p>Are you sure you want to proceed with this action?</p>
				<div className="grid grid-cols-2 gap-4 mt-6 justify-end">
					<Button variant="destructive" onClick={onClick}>
						Delete
					</Button>
					<Button variant="glass" onClick={onClose}>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default ConfirmModal;
