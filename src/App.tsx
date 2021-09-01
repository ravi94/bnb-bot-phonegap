import {
  IonApp,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonPicker,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import { useRef, useState } from "react";
import VolatileControls from "./components/VolatileControls";
import VolatileResults from "./components/VolatileResults";
import VolatilePicker from "./components/VolatilePicker";
import {
  getTopVolatileCoinsinUSDT,
  getCoinVolatility,
} from "./lib/getVolatility";
import { calculatorOutline } from "ionicons/icons";

const App: React.FC = () => {
 
  const candleOptions = [
    { text: "15 min", value: "15m" },
    { text: "1 hour", value: "1h" },
    { text: "2 hours", value: "2h" },
    { text: "4 hours", value: "4h" },
  ];
  //const [coin, setCoinValue] = useState("");
  const [candleSize, setCandleSize] = useState("15m");
  const [showLoading, setShowLoading] = useState(false);

  const [coinInfoRes, setCoinInfoResult] = useState<any>();
  const [coinListRes, setCoinListResult] = useState<any[]>();

  const coinInpRef = useRef<HTMLIonInputElement>(null);

  const calculateCoinVolatility = () => {
    const coin = coinInpRef.current!.value;
    if (!candleSize || !coin) return;

    getCoinVolatility(coin, candleSize).then((res) => {
      setCoinInfoResult(res);
    });
  };

  const getTop10Coins = () => {
    setShowLoading(true);
    getTopVolatileCoinsinUSDT(candleSize).then((res) => {
      setCoinListResult(res);
      setShowLoading(false);
    });
  };

  const reset = () => {
    setCoinInfoResult(null);
    setCoinListResult(undefined);
    coinInpRef.current!.value = "";
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle> Top Volatile coins </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={"Please wait..."}
        />
        <IonGrid>
          <IonRow>
            <IonCol className="ion-text-left">
              <IonItem>
                <IonLabel>Coin</IonLabel>
              </IonItem>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonItem>
                <IonInput ref={coinInpRef} value="BTC/USDT"></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          {/* <VolatilePicker
            label="Select Coin"
            setValue={setCoinValue}
            options={coinOptions}
            value={coin}
          /> */}
          <VolatilePicker
            label="Select Candle size"
            setValue={setCandleSize}
            options={candleOptions}
            value={candleSize}
          />

          <VolatileControls
            onCalculate={calculateCoinVolatility}
            onReset={reset}
          />
          <IonRow>
            <IonCol className="ion-text-left">
              <IonItem>
                <IonButton id="calc-btn" onClick={getTop10Coins}>
                  <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                  Get Top 10 Volatile coins
                </IonButton>
              </IonItem>
            </IonCol>
          </IonRow>

          {coinInfoRes && (
            <VolatileResults result={coinInfoRes?.vol} label="Average Volume" />
          )}
          {coinInfoRes && (
            <VolatileResults
              result={coinInfoRes?.amp_percent}
              label="Average Amplitude (%)"
            />
          )}
          {coinInfoRes && (
            <VolatileResults
              result={coinInfoRes?.max_amp_percent}
              label="Maximum Amplitude(%)"
            />
          )}

          {coinListRes && (
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>Top 10 Coins</IonCardSubtitle>
                    <IonCardTitle>
                      <ol>
                      {coinListRes.slice(0, 10).map((item) => {
                        return (<li>
                          <IonRow>
                            <IonCol className="ion-text-left">
                              {item?.symbol}
                            </IonCol>
                            <IonCol className="ion-text-right">
                              {item?.amp_percent.toFixed(2)}%
                            </IonCol>
                          </IonRow></li>
                        );
                      })}</ol>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
