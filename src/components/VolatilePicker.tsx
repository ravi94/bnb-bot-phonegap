import { IonCol, IonRow, IonButton, IonItem, useIonPicker } from "@ionic/react";
import React from "react";

const VolatilePicker: React.FC<{
  setValue: (arg0: string) => void;
  options: Array<Object>;
  value: any;
  label: string;
}> = (props) => {
  const [present] = useIonPicker();
  return (
    <IonRow>
      <IonCol>
        <IonItem>
          <IonButton
            expand="block"
            onClick={() =>
              present({
                buttons: [
                  {
                    text: "Confirm",
                    handler: (selected) => {
                      props.setValue(selected.item.value);
                    },
                  },
                ],
                columns: [
                  {
                    name: "item",
                    options: props.options,
                  },
                ],
              })
            }
          >
            {props.label}
          </IonButton>
        </IonItem>
      </IonCol>
      <IonCol>
        <IonItem>{props.value && <div>{props.value}</div>}</IonItem>
      </IonCol>
    </IonRow>
  );
};

export default VolatilePicker;
