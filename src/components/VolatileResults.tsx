import { IonCol,IonCard , IonRow, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";

const VolatileResults: React.FC<{result : number|string; label:string}> = (props)=>{
    return(<IonRow>
        <IonCol>
        <IonCard>
        <IonCardHeader>
            <IonCardSubtitle>{props.label}</IonCardSubtitle>
            <IonCardTitle>{props.result}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        </IonCol>
      </IonRow>);
};

export default VolatileResults;