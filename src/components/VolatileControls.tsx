import { IonCol, IonButton, IonIcon, IonItem, IonRow } from "@ionic/react";
import React from "react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";

const VolatileControls: React.FC<{
  onCalculate: () => void;
  onReset: () => void;
}> = (props) => {
  return (
    <IonRow>
      <IonCol className="ion-text-left">
        <IonItem>
          <IonButton id="calc-btn" onClick={props.onCalculate}>
            <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
            Calculate
          </IonButton>
        </IonItem>
      </IonCol>
      <IonCol className="ion-text-right">
        <IonItem>
          <IonButton id="reset-btn" fill="outline" onClick={props.onReset}>
            <IonIcon slot="start" icon={refreshOutline}></IonIcon>
            Reset
          </IonButton>
        </IonItem>
      </IonCol>
    </IonRow>
  );
};

export default VolatileControls;
