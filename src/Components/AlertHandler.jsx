import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { AlertContext } from "./Contexts";
import Alert from "./Alert";

export default function AlertHandler() {
  const portal = document.getElementById("portal");
  const {
    isRemovedAlertVisible,
    isNotRemovedAlertVisible,
    isCategoryAddedAlertVisible,
    isReachedMaxAlertVisible,
    isCategoryRemovedAlertVisible,
    isCantAddCategoryAlertVisible,
  } = useContext(AlertContext);

  return (
    <div>
      {createPortal(
        <div>
          <Alert
            title="All done tasks has been removed successfully"
            type="success"
            backgroundGradient="bg-success"
            isShowed={isRemovedAlertVisible}
          />
          <Alert
            title="There are no completed tasks to be deleted"
            type="error"
            backgroundGradient="bg-error"
            isShowed={isNotRemovedAlertVisible}
          />
          <Alert
            backgroundGradient="bg-success"
            title="New category has been added!"
            type="success"
            isShowed={isCategoryAddedAlertVisible}
          />
          <Alert
            backgroundGradient="bg-error"
            title="Category has been removed"
            type="error"
            isShowed={isCategoryRemovedAlertVisible}
          />
          <Alert
            title="You can add tasks with up to nine different categories"
            type="error"
            backgroundGradient="bg-error"
            isShowed={isReachedMaxAlertVisible}
          />
          <Alert
            title="You can't create a category with this name, try again!"
            type="error"
            backgroundGradient="bg-error"
            isShowed={isCantAddCategoryAlertVisible}
          />
        </div>,
        portal
      )}
    </div>
  );
}
