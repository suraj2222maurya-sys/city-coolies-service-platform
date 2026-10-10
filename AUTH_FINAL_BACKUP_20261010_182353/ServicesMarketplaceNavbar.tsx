"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import {
  getDeepCleaningCartServerSnapshot,
  getDeepCleaningCartSnapshot,
  parseDeepCleaningCartSnapshot,
  subscribeDeepCleaningCart,
} from "../app/services/deep-cleaning/deepCleaningCart";
import CustomerAccountControl from "./CustomerAccountControl";

type OpenPanel = "location" | "cart" | null;

type IconProps = {
  className?: string;
};

const LOCATION_STORAGE_KEY =
  "city-coolies-service-location";

const LOCATION_COORDS_STORAGE_KEY =
  "city-coolies-service-location-coordinates";
const SERVICE_SEARCH_ITEMS = [
    {
        "name":  "1 Bathroom",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "1 Bathroom",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "i nt en se b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "1 BHK",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "1 BHK",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "1 b hk"
                     ]
    },
    {
        "name":  "1 BHK",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "1 BHK",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "1 bh k"
                     ]
    },
    {
        "name":  "1 RK / Studio",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "1 RK / Studio",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "s tu di o"
                     ]
    },
    {
        "name":  "10 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "10 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "10 p ie ce"
                     ]
    },
    {
        "name":  "10 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "10 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "10 s ea t"
                     ]
    },
    {
        "name":  "100 - 150 Sq ft",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "100 - 150 Sq ft",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "100 150"
                     ]
    },
    {
        "name":  "1000 - 3000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "1000 - 3000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "1000 3000 l it re s"
                     ]
    },
    {
        "name":  "12000 - 20000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "12000 - 20000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "12000 20000 l it re s"
                     ]
    },
    {
        "name":  "125 kVA Generator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "125 kVA Generator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "125 k va"
                     ]
    },
    {
        "name":  "14-Foot Lorry",
        "href":  "/services/rental-services",
        "keywords":  [
                         "14-Foot Lorry",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "l or ry 14 ft"
                     ]
    },
    {
        "name":  "150 - 200 Sq ft",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "150 - 200 Sq ft",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "150 200"
                     ]
    },
    {
        "name":  "16A Power Socket Point",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "16A Power Socket Point",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "16 a s oc ke t"
                     ]
    },
    {
        "name":  "17-Foot Lorry",
        "href":  "/services/rental-services",
        "keywords":  [
                         "17-Foot Lorry",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "l or ry 17 ft"
                     ]
    },
    {
        "name":  "2 Bathrooms",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "2 Bathrooms",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "2 b at hr oo ms"
                     ]
    },
    {
        "name":  "2 BHK",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "2 BHK",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "2 b hk"
                     ]
    },
    {
        "name":  "2 BHK",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "2 BHK",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "2 bh k"
                     ]
    },
    {
        "name":  "2 burners",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "2 burners",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "g as s to ve c le an in g"
                     ]
    },
    {
        "name":  "2 Hours Gardener",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "2 Hours Gardener",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "2 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "2 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "c ur ta in c le an in g"
                     ]
    },
    {
        "name":  "20 kVA Generator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "20 kVA Generator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "20 k va"
                     ]
    },
    {
        "name":  "25 - 50 Sq ft",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "25 - 50 Sq ft",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "25 50"
                     ]
    },
    {
        "name":  "3 Bathrooms",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3 Bathrooms",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "3 b at hr oo ms"
                     ]
    },
    {
        "name":  "3 BHK",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3 BHK",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "3 b hk"
                     ]
    },
    {
        "name":  "3 BHK",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "3 BHK",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "3 bh k"
                     ]
    },
    {
        "name":  "3 burners",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3 burners",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "3 b ur ne rs"
                     ]
    },
    {
        "name":  "3 Hours Gardener",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "3 Hours Gardener",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "3 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "3 p ie ce"
                     ]
    },
    {
        "name":  "3 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "3 s ea t"
                     ]
    },
    {
        "name":  "3000 - 6000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "3000 - 6000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "3000 6000 l it re s"
                     ]
    },
    {
        "name":  "4 Bathrooms",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "4 Bathrooms",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "4 b at hr oo ms"
                     ]
    },
    {
        "name":  "4 BHK",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "4 BHK",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "4 b hk"
                     ]
    },
    {
        "name":  "4 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "4 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "4 p ie ce"
                     ]
    },
    {
        "name":  "4 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "4 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "4 s ea t"
                     ]
    },
    {
        "name":  "4+ burners",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "4+ burners",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "4 p lu s b ur ne rs"
                     ]
    },
    {
        "name":  "40 kVA Generator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "40 kVA Generator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "40 k va"
                     ]
    },
    {
        "name":  "5 Bathrooms",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "5 Bathrooms",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "5 b at hr oo ms"
                     ]
    },
    {
        "name":  "5 BHK",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "5 BHK",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "5 b hk"
                     ]
    },
    {
        "name":  "5 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "5 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "5 p ie ce"
                     ]
    },
    {
        "name":  "5 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "5 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "5 s ea t"
                     ]
    },
    {
        "name":  "50 - 100 Sq ft",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "50 - 100 Sq ft",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "50 100"
                     ]
    },
    {
        "name":  "5000 - 8000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "5000 - 8000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "5000 8000 l it re s"
                     ]
    },
    {
        "name":  "6 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "6 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "6 p ie ce"
                     ]
    },
    {
        "name":  "6 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "6 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "6 s ea t"
                     ]
    },
    {
        "name":  "6000 - 10000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "6000 - 10000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "6000 10000 l it re s"
                     ]
    },
    {
        "name":  "62.5 kVA Generator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "62.5 kVA Generator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "62 k va"
                     ]
    },
    {
        "name":  "6A Socket Point",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "6A Socket Point",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "6 a s oc ke t"
                     ]
    },
    {
        "name":  "7 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "7 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "7 p ie ce"
                     ]
    },
    {
        "name":  "7 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "7 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "7 s ea t"
                     ]
    },
    {
        "name":  "8 Hours Gardener",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "8 Hours Gardener",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "8 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "8 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "8 p ie ce"
                     ]
    },
    {
        "name":  "8 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "8 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "8 s ea t"
                     ]
    },
    {
        "name":  "8000 - 12000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "8000 - 12000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "8000 12000 l it re s"
                     ]
    },
    {
        "name":  "9 Pieces",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "9 Pieces",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "9 p ie ce"
                     ]
    },
    {
        "name":  "9 Seat",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "9 Seat",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "9 s ea t"
                     ]
    },
    {
        "name":  "Abhyangam Neck-to-Toe Stress Relief Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Abhyangam Neck-to-Toe Stress Relief Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "a bh ya ng am"
                     ]
    },
    {
        "name":  "Accessible filter and function service",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Accessible filter and function service",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "b as ic s er vi ce"
                     ]
    },
    {
        "name":  "Additional room or area",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Additional room or area",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "e xt ra a re a"
                     ]
    },
    {
        "name":  "Adenium Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Adenium Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Air cooler check-up",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Air cooler check-up",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c oo le r c he ck"
                     ]
    },
    {
        "name":  "Air cooler setup / fitting",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Air cooler setup / fitting",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c oo le r i ns ta ll"
                     ]
    },
    {
        "name":  "Air fryer cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Air fryer cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "a ir f ry er"
                     ]
    },
    {
        "name":  "All Types Industrial Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "All Types Industrial Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "i nd us tr ia l s it e c le an in g"
                     ]
    },
    {
        "name":  "Anti Tan Cleanup",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Anti Tan Cleanup",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "a nt i t an"
                     ]
    },
    {
        "name":  "Apartment Pest Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Apartment Pest Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "a pa rt me nt p es t c on tr ol"
                     ]
    },
    {
        "name":  "Appliance Repair",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Appliance Repair",
                         "a pp li an ce r ep ai r"
                     ]
    },
    {
        "name":  "Areca Palm",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Areca Palm",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Aroma Magic Glow",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Aroma Magic Glow",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "a ro ma m ag ic"
                     ]
    },
    {
        "name":  "Artificial Turf Installation",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Artificial Turf Installation",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Artificial Vertical Garden",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Artificial Vertical Garden",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Azalea Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Azalea Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Back Relief Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Back Relief Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ac k r el ie f"
                     ]
    },
    {
        "name":  "Back Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Back Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ac k"
                     ]
    },
    {
        "name":  "Backhoe Loader",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Backhoe Loader",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "b ac kh oe"
                     ]
    },
    {
        "name":  "Balcony Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Balcony Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "b al co ny c le an in g"
                     ]
    },
    {
        "name":  "Balcony Vertical Garden",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Balcony Vertical Garden",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Banana Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Banana Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Banyan Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Banyan Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Bathroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Bathroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "Bathroom deep cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Bathroom deep cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "b at hr oo m d ee p c le an in g"
                     ]
    },
    {
        "name":  "Bathroom Plumbing",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Bathroom Plumbing",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "b at hr oo m p lu mb in g"
                     ]
    },
    {
        "name":  "Bathroom Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Bathroom Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "b at hr oo m r en ov at io n"
                     ]
    },
    {
        "name":  "Beard Colour",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Beard Colour",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ea rd"
                     ]
    },
    {
        "name":  "Bed Bug Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Bed Bug Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "b ed b ug c on tr ol"
                     ]
    },
    {
        "name":  "Bedroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Bedroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "b ed ro om c le an in g"
                     ]
    },
    {
        "name":  "Beds \u0026 Storage",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Beds \u0026 Storage",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "b ed s"
                     ]
    },
    {
        "name":  "Ber Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Ber Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Bike \u0026 Vehicle Transport",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Bike \u0026 Vehicle Transport",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "b ik e v eh ic le m ov in g"
                     ]
    },
    {
        "name":  "Bikini Line Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Bikini Line Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ik in i l in e"
                     ]
    },
    {
        "name":  "Bikini Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Bikini Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ik in i"
                     ]
    },
    {
        "name":  "Black Rose",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Black Rose",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Bougainvillea Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Bougainvillea Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Boxwood Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Boxwood Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Brazilian Stripless Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Brazilian Stripless Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ra zi li an"
                     ]
    },
    {
        "name":  "Breaker Attachment",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Breaker Attachment",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "b re ak er"
                     ]
    },
    {
        "name":  "Building Cobweb Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Building Cobweb Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C ob we bC le an in gS ec ti on",
                         "b ui ld in g c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Burner / ignition service",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Burner / ignition service",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "b ur ne r s er vi ce"
                     ]
    },
    {
        "name":  "Butt Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Butt Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b ut t"
                     ]
    },
    {
        "name":  "Cabinet Exterior \u0026 Interior",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Cabinet Exterior \u0026 Interior",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "c ab in et i nt er io r e xt er io r"
                     ]
    },
    {
        "name":  "Cabinet Exterior Only",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Cabinet Exterior Only",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "c om pl et e k it ch en c le an in g"
                     ]
    },
    {
        "name":  "Car Transport Assessment",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Car Transport Assessment",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "c ar"
                     ]
    },
    {
        "name":  "Carpentry",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Carpentry",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "c ar pe nt ry"
                     ]
    },
    {
        "name":  "Carpentry \u0026 Interior Works",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks"
                     ]
    },
    {
        "name":  "Carpet cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Carpet cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "c ar pe t c le an in g"
                     ]
    },
    {
        "name":  "Ceramic Pot",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Ceramic Pot",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "c er am ic p ot"
                     ]
    },
    {
        "name":  "Chimney Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Chimney Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "c hi mn ey c le an in g"
                     ]
    },
    {
        "name":  "Chimney installation assessment",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Chimney installation assessment",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Chimney repair diagnosis",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Chimney repair diagnosis",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c he ck up"
                     ]
    },
    {
        "name":  "Chinese Elm Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Chinese Elm Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Civil Construction \u0026 Maintenance",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce"
                     ]
    },
    {
        "name":  "Cobweb Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Cobweb Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Cobweb Removal",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Cobweb Removal",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "c ob we b r em ov al"
                     ]
    },
    {
        "name":  "Cockroach Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Cockroach Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "c oc kr oa ch c on tr ol"
                     ]
    },
    {
        "name":  "Cocopeat Block (5 kg)",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Cocopeat Block (5 kg)",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Commercial \u0026 Industrial Civil Work",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Commercial \u0026 Industrial Civil Work",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "c om me rc ia l i nd us tr ia l c iv il w or k"
                     ]
    },
    {
        "name":  "Commercial Bathroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Commercial Bathroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "c om me rc ia l b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "Commercial Cobweb Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Commercial Cobweb Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C ob we bC le an in gS ec ti on",
                         "c om me rc ia l c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Commercial Kitchen Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Commercial Kitchen Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "c om me rc ia l k it ch en c le an in g"
                     ]
    },
    {
        "name":  "Commercial Pest Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Commercial Pest Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "c om me rc ia l p es t c on tr ol"
                     ]
    },
    {
        "name":  "Complete Construction Work",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Complete Construction Work",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "c om pl et e c on st ru ct io n w or k"
                     ]
    },
    {
        "name":  "Complete Garden Setup",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Complete Garden Setup",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Complete House Electrical Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Complete House Electrical Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "c om pl et e h ou se e le ct ri ca l r en ov at io n"
                     ]
    },
    {
        "name":  "Complete Kitchen Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Complete Kitchen Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "c om pl et e k it ch en c le an in g"
                     ]
    },
    {
        "name":  "Compost \u0026 Soil",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Compost \u0026 Soil",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "c om po st"
                     ]
    },
    {
        "name":  "CPVC Water Supply Pipe Laying - 15/20 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "CPVC Water Supply Pipe Laying - 15/20 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "c pv c 15 20"
                     ]
    },
    {
        "name":  "CPVC Water Supply Pipe Laying - 25 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "CPVC Water Supply Pipe Laying - 25 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "c pv c 25"
                     ]
    },
    {
        "name":  "CPVC Water Supply Pipe Laying - 32 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "CPVC Water Supply Pipe Laying - 32 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "c pv c 32"
                     ]
    },
    {
        "name":  "Crabapple Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Crabapple Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Crane Rental",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Crane Rental",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "c ra ne r en ta l"
                     ]
    },
    {
        "name":  "Curry Leaf Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Curry Leaf Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Curtain cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Curtain cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "c ur ta in c le an in g"
                     ]
    },
    {
        "name":  "Custom \u0026 Commercial Fabrication",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Custom \u0026 Commercial Fabrication",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "c om me rc ia l c us to m f ab ri ca ti on"
                     ]
    },
    {
        "name":  "Custom Carpentry",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Custom Carpentry",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "c us to m"
                     ]
    },
    {
        "name":  "Customize Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Customize Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lH om eB yR oo mC le an in gS ec ti on",
                         "c us to mi ze c le an in g"
                     ]
    },
    {
        "name":  "Deep Cleaning",
        "href":  "/services/deep-cleaning?category=full-home-by-room",
        "keywords":  [
                         "Deep Cleaning",
                         "d ee p c le an in g"
                     ]
    },
    {
        "name":  "Deep Cleansing Cleanup",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Deep Cleansing Cleanup",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "c le an up"
                     ]
    },
    {
        "name":  "Deep Tissue Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Deep Tissue Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "d ee p t is su e"
                     ]
    },
    {
        "name":  "Deep Tissue with Foot Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Deep Tissue with Foot Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "d ee p t is su e f oo t"
                     ]
    },
    {
        "name":  "De-Tan Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "De-Tan Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "d et an"
                     ]
    },
    {
        "name":  "Dining table 10 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 10 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "10 s ea te r"
                     ]
    },
    {
        "name":  "Dining table 4 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 4 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "d in in g t ab le c le an in g"
                     ]
    },
    {
        "name":  "Dining table 5 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 5 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "5 s ea te r"
                     ]
    },
    {
        "name":  "Dining table 6 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 6 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "6 s ea te r"
                     ]
    },
    {
        "name":  "Dining table 7 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 7 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "7 s ea te r"
                     ]
    },
    {
        "name":  "Dining table 8 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 8 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "8 s ea te r"
                     ]
    },
    {
        "name":  "Dining table 9 seater",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table 9 seater",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "9 s ea te r"
                     ]
    },
    {
        "name":  "Dining table cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Dining table cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "d in in g t ab le c le an in g"
                     ]
    },
    {
        "name":  "Doorbell / Video Doorbell Fitting",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Doorbell / Video Doorbell Fitting",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "d oo rb el l v id eo d oo rb el l f it ti ng"
                     ]
    },
    {
        "name":  "Doors, Hinges \u0026 Locks",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Doors, Hinges \u0026 Locks",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "d oo rs"
                     ]
    },
    {
        "name":  "Double",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Double",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "d ou bl e"
                     ]
    },
    {
        "name":  "Drain / inlet connection service",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Drain / inlet connection service",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "d ra in"
                     ]
    },
    {
        "name":  "Dwarf Jade Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Dwarf Jade Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Electrical Installation",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Electrical Installation",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "e le ct ri ca l i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Electrical Works",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Electrical Works",
                         "e le ct ri ca l w or ks"
                     ]
    },
    {
        "name":  "Excavator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Excavator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "e xc av at or"
                     ]
    },
    {
        "name":  "Exhaust fan fitting",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Exhaust fan fitting",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Exhaust Fan Repair \u0026 Fitting",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Exhaust Fan Repair \u0026 Fitting",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "e xh au st f an"
                     ]
    },
    {
        "name":  "Exhaust fan repair diagnosis",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Exhaust fan repair diagnosis",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c he ck up"
                     ]
    },
    {
        "name":  "Exterior Civil Work",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Exterior Civil Work",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "e xt er io r c iv il w or k"
                     ]
    },
    {
        "name":  "Extra balcony",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Extra balcony",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "e xt ra b al co ny"
                     ]
    },
    {
        "name":  "Extra bathroom",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Extra bathroom",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "e xt ra b at hr oo m"
                     ]
    },
    {
        "name":  "Extra bedroom",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Extra bedroom",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "e xt ra b ed ro om"
                     ]
    },
    {
        "name":  "Eyebrow Threading",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Eyebrow Threading",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "t hr ea di ng"
                     ]
    },
    {
        "name":  "Fabric sofa cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Fabric sofa cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "f ab ri c s of a c le an in g"
                     ]
    },
    {
        "name":  "Fabrication Works",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks"
                     ]
    },
    {
        "name":  "Face Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Face Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f ac e"
                     ]
    },
    {
        "name":  "Facial for Men",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Facial for Men",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "m en f ac ia l"
                     ]
    },
    {
        "name":  "Facial for Women",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Facial for Women",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s al on f or w om en"
                     ]
    },
    {
        "name":  "Fan cleaning and service",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Fan cleaning and service",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c le an s er vi ce"
                     ]
    },
    {
        "name":  "Fan, switch \u0026 fixture cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Fan, switch \u0026 fixture cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "f an s wi tc h f ix tu re c le an in g"
                     ]
    },
    {
        "name":  "Fiber Pot",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Fiber Pot",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "f ib er p ot"
                     ]
    },
    {
        "name":  "Ficus Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Ficus Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Floor deep cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Floor deep cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "f lo or d ee p c le an in g"
                     ]
    },
    {
        "name":  "Flush Tank Fitting / Repair",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Flush Tank Fitting / Repair",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "f lu sh t an k"
                     ]
    },
    {
        "name":  "Foot \u0026 Calf Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Foot \u0026 Calf Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f oo t"
                     ]
    },
    {
        "name":  "Foot Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Foot Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f oo t"
                     ]
    },
    {
        "name":  "Fragile Items Packing",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Fragile Items Packing",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "f ra gi le"
                     ]
    },
    {
        "name":  "Fridge \u0026 Cooler Repair",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Fridge \u0026 Cooler Repair",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "f ri dg e c oo le r"
                     ]
    },
    {
        "name":  "Fukien Tea Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Fukien Tea Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Full apartment",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Full apartment",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lH om eB yR oo mC le an in gS ec ti on",
                         "f ul l a pa rt me nt"
                     ]
    },
    {
        "name":  "Full Body Massage \u0026 Scrub",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Full Body Massage \u0026 Scrub",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b od y s cr ub"
                     ]
    },
    {
        "name":  "Full Body Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Full Body Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f ul l b od y"
                     ]
    },
    {
        "name":  "Full bungalow/duplex",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Full bungalow/duplex",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lH om eB yR oo mC le an in gS ec ti on",
                         "f ul l b un ga lo w d up le x"
                     ]
    },
    {
        "name":  "Full Hair Colour",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Full Hair Colour",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f ul l"
                     ]
    },
    {
        "name":  "Full Home \u0026 Apartment Construction",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Full Home \u0026 Apartment Construction",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "f ul l h om e a pa rt me nt c on st ru ct io n"
                     ]
    },
    {
        "name":  "Full Home / By Room Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Full Home / By Room Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "f ul l h om e b y r oo m"
                     ]
    },
    {
        "name":  "Full Home Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Full Home Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "f ul l h om e p ai nt in g"
                     ]
    },
    {
        "name":  "Full Home Pest Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Full Home Pest Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "f ul l h om e p es t c on tr ol"
                     ]
    },
    {
        "name":  "Full Home Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Full Home Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "f ul l h om e r en ov at io n"
                     ]
    },
    {
        "name":  "Full House Electrical Wiring",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Full House Electrical Wiring",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "f ul l h ou se e le ct ri ca l w ir in g"
                     ]
    },
    {
        "name":  "Full Legs Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Full Legs Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f ul l l eg s"
                     ]
    },
    {
        "name":  "Furnished apartment - Home deep cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Furnished apartment - Home deep cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "f ur ni sh ed a pa rt me nt"
                     ]
    },
    {
        "name":  "Furnished bungalow \u0026 duplex cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Furnished bungalow \u0026 duplex cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "f ur ni sh ed b un ga lo w d up le x"
                     ]
    },
    {
        "name":  "Furnished villa cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Furnished villa cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "f ur ni sh ed v il la c le an in g"
                     ]
    },
    {
        "name":  "Furniture Repair",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Furniture Repair",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "f ur ni tu re"
                     ]
    },
    {
        "name":  "Garden Bed Border Setup",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Garden Bed Border Setup",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Garden Pathway Installation",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Garden Pathway Installation",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Gardener",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Gardener",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "g ar de ne r"
                     ]
    },
    {
        "name":  "Gardening \u0026 Landscaping",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng"
                     ]
    },
    {
        "name":  "Gas hose connection assessment",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Gas hose connection assessment",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "h os e c he ck"
                     ]
    },
    {
        "name":  "Gas Stove \u0026 Gas Pipe Service",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Gas Stove \u0026 Gas Pipe Service",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "g as s to ve p ip e"
                     ]
    },
    {
        "name":  "Gas stove / hob cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Gas stove / hob cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "g as s to ve"
                     ]
    },
    {
        "name":  "Gas Stove Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Gas Stove Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "g as s to ve c le an in g"
                     ]
    },
    {
        "name":  "Gas stove diagnosis",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Gas stove diagnosis",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "s to ve c he ck"
                     ]
    },
    {
        "name":  "Gate Fabrication \u0026 Installation",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Gate Fabrication \u0026 Installation",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "g at e f ab ri ca ti on"
                     ]
    },
    {
        "name":  "Gate Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Gate Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "g at e"
                     ]
    },
    {
        "name":  "Generator Rental",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Generator Rental",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "g en er at or r en ta l"
                     ]
    },
    {
        "name":  "Geyser installation",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Geyser installation",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Geyser Installation \u0026 Repair",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Geyser Installation \u0026 Repair",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "g ey se r"
                     ]
    },
    {
        "name":  "Geyser repair diagnosis",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Geyser repair diagnosis",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c he ck up"
                     ]
    },
    {
        "name":  "Geyser uninstallation",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Geyser uninstallation",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "u ni ns ta ll"
                     ]
    },
    {
        "name":  "Ginseng Ficus Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Ginseng Ficus Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Global Hair Colour",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Global Hair Colour",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "g lo ba l c ol ou r"
                     ]
    },
    {
        "name":  "Glow Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Glow Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "g lo w"
                     ]
    },
    {
        "name":  "Grow Bag",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Grow Bag",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "g ro w b ag"
                     ]
    },
    {
        "name":  "Guava Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Guava Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Hair Colour for Men",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Hair Colour for Men",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "m en h ai r c ol ou r"
                     ]
    },
    {
        "name":  "Hair Spa",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Hair Spa",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h ai r s pa"
                     ]
    },
    {
        "name":  "Hair Studio for Women",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Hair Studio for Women",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h ai r s tu di o f or w om en"
                     ]
    },
    {
        "name":  "Hanging Pot",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Hanging Pot",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "h an gi ng p ot"
                     ]
    },
    {
        "name":  "Head, Neck \u0026 Shoulder Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Head, Neck \u0026 Shoulder Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h ea d s ho ul de r"
                     ]
    },
    {
        "name":  "Heavy-Lift Crane",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Heavy-Lift Crane",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "h ea vy c ra ne"
                     ]
    },
    {
        "name":  "Hibiscus Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Hibiscus Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Home Cobweb Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Home Cobweb Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C ob we bC le an in gS ec ti on",
                         "h om e c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Hospital \u0026 Clinic Sanitization",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Hospital \u0026 Clinic Sanitization",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "h os pi ta l c li ni c s an it iz at io n"
                     ]
    },
    {
        "name":  "Hot Bed",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Hot Bed",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h ot b ed"
                     ]
    },
    {
        "name":  "Hydrating Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Hydrating Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h yd ra ti ng"
                     ]
    },
    {
        "name":  "Industrial \u0026 Commercial Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Industrial \u0026 Commercial Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "i nd us tr ia l c le an in g"
                     ]
    },
    {
        "name":  "Industrial Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Industrial Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "D ee pC le an in gS el ec to rM od al",
                         "i nd us tr ia l c le an in g"
                     ]
    },
    {
        "name":  "Industrial Cobweb Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Industrial Cobweb Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C ob we bC le an in gS ec ti on",
                         "i nd us tr ia l c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Intense Bathroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Intense Bathroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "i nt en se b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "Intercity Relocation",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Intercity Relocation",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "i nt er ci ty r el oc at io n"
                     ]
    },
    {
        "name":  "Interior Designing",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Interior Designing",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "i nt er io r d es ig ni ng"
                     ]
    },
    {
        "name":  "Interior Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Interior Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "i nt er io r"
                     ]
    },
    {
        "name":  "Jade Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Jade Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Japanese Maple Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Japanese Maple Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "JCB Rental",
        "href":  "/services/rental-services",
        "keywords":  [
                         "JCB Rental",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "j cb r en ta l"
                     ]
    },
    {
        "name":  "Jet Spray Fitting",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Jet Spray Fitting",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "j et s pr ay"
                     ]
    },
    {
        "name":  "Juniper Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Juniper Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Keratin Smoothing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Keratin Smoothing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "k er at in"
                     ]
    },
    {
        "name":  "King",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "King",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "k in g"
                     ]
    },
    {
        "name":  "Kitchen cabinet interior",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Kitchen cabinet interior",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "c ab in et i nt er io r"
                     ]
    },
    {
        "name":  "Kitchen Chimney Service \u0026 Repair",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Kitchen Chimney Service \u0026 Repair",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c hi mn ey"
                     ]
    },
    {
        "name":  "Kitchen Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Kitchen Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "k it ch en c le an in g"
                     ]
    },
    {
        "name":  "Kitchen deep cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Kitchen deep cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "k it ch en d ee p c le an in g"
                     ]
    },
    {
        "name":  "Kitchen Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Kitchen Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "k it ch en r en ov at io n"
                     ]
    },
    {
        "name":  "Kitchen storage \u0026 appliances",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Kitchen storage \u0026 appliances",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "k it ch en s to ra ge"
                     ]
    },
    {
        "name":  "Korean Glass Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Korean Glass Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "k or ea n g la ss"
                     ]
    },
    {
        "name":  "Korean Glow Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Korean Glow Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "k or ea n g lo w"
                     ]
    },
    {
        "name":  "Korean Peptide Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Korean Peptide Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "k or ea n p la nt"
                     ]
    },
    {
        "name":  "Kumkumadi Ubtan",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Kumkumadi Ubtan",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "k um ku ma di"
                     ]
    },
    {
        "name":  "Landscaping",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Landscaping",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "l an ds ca pi ng"
                     ]
    },
    {
        "name":  "Large Motorcycle",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Large Motorcycle",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "l ar ge b ik e"
                     ]
    },
    {
        "name":  "Lawn Aeration",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Aeration",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Lawn Care",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Care",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "l aw n c ar e"
                     ]
    },
    {
        "name":  "Lawn Edge Trimming",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Edge Trimming",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Lawn Fertilizing",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Fertilizing",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Lawn Mowing",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Mowing",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Lawn Weed Removal",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lawn Weed Removal",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Leather sofa cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Leather sofa cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "l ea th er s of a c le an in g"
                     ]
    },
    {
        "name":  "LED Light Fitting",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "LED Light Fitting",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "l ed l ig ht"
                     ]
    },
    {
        "name":  "Lemon Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lemon Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Lemon Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Lemon Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Living \u0026 Bedroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Living \u0026 Bedroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "D ee pC le an in gS el ec to rM od al",
                         "l iv in g b ed ro om"
                     ]
    },
    {
        "name":  "Living Room Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Living Room Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "l iv in g r oo m c le an in g"
                     ]
    },
    {
        "name":  "Loading \u0026 Unloading",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Loading \u0026 Unloading",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "l oa di ng u nl oa di ng"
                     ]
    },
    {
        "name":  "Loading Only",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Loading Only",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "l oa di ng"
                     ]
    },
    {
        "name":  "Local Home Shifting",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Local Home Shifting",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "l oc al h om e s hi ft in g"
                     ]
    },
    {
        "name":  "Lorry Rental",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Lorry Rental",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "l or ry r en ta l"
                     ]
    },
    {
        "name":  "Machinery Exterior Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Machinery Exterior Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "m ac hi ne ry e xt er io r c le an in g"
                     ]
    },
    {
        "name":  "Main Meter Box Wiring / Panel Work",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Main Meter Box Wiring / Panel Work",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "m ai n m et er b ox p an el w or k"
                     ]
    },
    {
        "name":  "Mall \u0026 Common-Area Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Mall \u0026 Common-Area Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "m al l c om mo n a re a c le an in g"
                     ]
    },
    {
        "name":  "Mango Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Mango Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Marking \u0026 Safety Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Marking \u0026 Safety Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "m ar ki ng s af et y p ai nt in g"
                     ]
    },
    {
        "name":  "Mattress cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Mattress cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "m at tr es s c le an in g"
                     ]
    },
    {
        "name":  "MCB Fitting",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "MCB Fitting",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "m cb"
                     ]
    },
    {
        "name":  "Men",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Men",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "m en"
                     ]
    },
    {
        "name":  "Microwave Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Microwave Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en Cl ea ni ng Se ct io n",
                         "m ic ro wa ve c le an in g"
                     ]
    },
    {
        "name":  "Mini Excavator",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Mini Excavator",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "m in i e xc av at or"
                     ]
    },
    {
        "name":  "Mini Lorry",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Mini Lorry",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "m in i l or ry"
                     ]
    },
    {
        "name":  "Mobile Crane",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Mobile Crane",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "m ob il e c ra ne"
                     ]
    },
    {
        "name":  "Modular Kitchen Woodwork",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Modular Kitchen Woodwork",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "k it ch en"
                     ]
    },
    {
        "name":  "Money Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Money Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Moringa Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Moringa Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Most Popular Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Most Popular Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "m os t p op ul ar p ai nt in g"
                     ]
    },
    {
        "name":  "Move-in/Move-out Bathroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Move-in/Move-out Bathroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "m ov e i n m ov e o ut b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "Natural Vertical Garden",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Natural Vertical Garden",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Neem Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Neem Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Neem Cake (1 kg)",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Neem Cake (1 kg)",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "New Home Plumbing",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "New Home Plumbing",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "n ew h om e p lu mb in g"
                     ]
    },
    {
        "name":  "Nursery",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Nursery",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "n ur se ry"
                     ]
    },
    {
        "name":  "O3+ Power Brightening",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "O3+ Power Brightening",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "o3 p ow er"
                     ]
    },
    {
        "name":  "O3+ Shine \u0026 Glow",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "O3+ Shine \u0026 Glow",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "o3 s hi ne"
                     ]
    },
    {
        "name":  "Office \u0026 Commercial Moving",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Office \u0026 Commercial Moving",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "o ff ic e c om me rc ia l m ov in g"
                     ]
    },
    {
        "name":  "Office / Commercial Woodwork",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Office / Commercial Woodwork",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "o ff ic e"
                     ]
    },
    {
        "name":  "Office Carpet Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Office Carpet Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "o ff ic e c ar pe t c le an in g"
                     ]
    },
    {
        "name":  "Office Move",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Office Move",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "o ff ic e"
                     ]
    },
    {
        "name":  "Office Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Office Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "o ff ic e r en ov at io n"
                     ]
    },
    {
        "name":  "Olive Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Olive Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Orange Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Orange Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "OTG cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "OTG cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "o tg"
                     ]
    },
    {
        "name":  "Overhead Concrete Water Tank Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Overhead Concrete Water Tank Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "o ve rh ea d c on cr et e w at er t an k c le an in g"
                     ]
    },
    {
        "name":  "Overhead Water Tank Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Overhead Water Tank Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "o ve rh ea d w at er t an k c le an in g"
                     ]
    },
    {
        "name":  "Packers \u0026 Movers",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s"
                     ]
    },
    {
        "name":  "Packing \u0026 Unpacking",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Packing \u0026 Unpacking",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "p ac ki ng u np ac ki ng"
                     ]
    },
    {
        "name":  "Packing Only",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Packing Only",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "p ac ki ng"
                     ]
    },
    {
        "name":  "Painting Services",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Painting Services",
                         "p ai nt in g s er vi ce s"
                     ]
    },
    {
        "name":  "Parking Line Marking",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Parking Line Marking",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "p ar ki ng"
                     ]
    },
    {
        "name":  "Peace Lily",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Peace Lily",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Peepal Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Peepal Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Pest Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Pest Control",
                         "p es t c on tr ol"
                     ]
    },
    {
        "name":  "Pick \u0026 Carry Crane",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Pick \u0026 Carry Crane",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "p ic k c ar ry"
                     ]
    },
    {
        "name":  "Pickup Truck",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Pickup Truck",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "p ic ku p"
                     ]
    },
    {
        "name":  "Pink Rose",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Pink Rose",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Pipe Work",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Pipe Work",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "p ip e w or k"
                     ]
    },
    {
        "name":  "Plumbing Installation",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Plumbing Installation",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "p lu mb in g i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Plumbing Works",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Plumbing Works",
                         "p lu mb in g w or ks"
                     ]
    },
    {
        "name":  "Pomegranate Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Pomegranate Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Post Natal Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Post Natal Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "p os t n at al"
                     ]
    },
    {
        "name":  "Pots",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Pots",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p ot s"
                     ]
    },
    {
        "name":  "Potting Mix (5 kg)",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Potting Mix (5 kg)",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Power Glow Cleanup",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Power Glow Cleanup",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "p ow er c le an up"
                     ]
    },
    {
        "name":  "Putty \u0026 Primer",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Putty \u0026 Primer",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "p ut ty p ri me r"
                     ]
    },
    {
        "name":  "Queen",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Queen",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "q ue en"
                     ]
    },
    {
        "name":  "RCC Construction",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "RCC Construction",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "r cc c on st ru ct io n"
                     ]
    },
    {
        "name":  "Red Rose",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Red Rose",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Refrigerator check-up",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Refrigerator check-up",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "f ri dg e c he ck"
                     ]
    },
    {
        "name":  "Refrigerator cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Refrigerator cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "r ef ri ge ra to r"
                     ]
    },
    {
        "name":  "Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Renovation",
                         "r en ov at io n"
                     ]
    },
    {
        "name":  "Rental Services",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Rental Services",
                         "r en ta l s er vi ce s"
                     ]
    },
    {
        "name":  "Repair \u0026 Maintenance Civil Work",
        "href":  "/services/civil-construction-maintenance",
        "keywords":  [
                         "Repair \u0026 Maintenance Civil Work",
                         "Civil Construction \u0026 Maintenance",
                         "c iv il c on st ru ct io n m ai nt en an ce",
                         "C iv il Co ns tr uc ti on Ma rk et pl ac e",
                         "r ep ai r m ai nt en an ce c iv il w or k"
                     ]
    },
    {
        "name":  "Repair diagnosis / check-up",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Repair diagnosis / check-up",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c he ck up"
                     ]
    },
    {
        "name":  "Restaurant \u0026 Cafe Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Restaurant \u0026 Cafe Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "r es ta ur an t c af e c le an in g"
                     ]
    },
    {
        "name":  "Restroom Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Restroom Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "r es tr oo m c le an in g"
                     ]
    },
    {
        "name":  "Road Curb Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Road Curb Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "c ur b"
                     ]
    },
    {
        "name":  "Rodent Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Rodent Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "r od en t c on tr ol"
                     ]
    },
    {
        "name":  "Roof Shed \u0026 Canopy Fabrication",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Roof Shed \u0026 Canopy Fabrication",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "s he d c an op y"
                     ]
    },
    {
        "name":  "Root Touch-Up",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Root Touch-Up",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "r oo t t ou ch u p"
                     ]
    },
    {
        "name":  "Rubber Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Rubber Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Sandwich maker / griller",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Sandwich maker / griller",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "K it ch en St or ag eA pp li an ce sO pt io ns",
                         "s an dw ic h g ri ll er"
                     ]
    },
    {
        "name":  "Sara Fruit Cleanup",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Sara Fruit Cleanup",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s ar a f ru it"
                     ]
    },
    {
        "name":  "Sara Glow Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Sara Glow Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s ar a l ig ht en in g"
                     ]
    },
    {
        "name":  "School \u0026 Institution Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "School \u0026 Institution Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "s ch oo l i ns ti tu ti on c le an in g"
                     ]
    },
    {
        "name":  "Scooter / Bike",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Scooter / Bike",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "s co ot er"
                     ]
    },
    {
        "name":  "Self-Watering Pot",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Self-Watering Pot",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "s el f w at er in g p ot"
                     ]
    },
    {
        "name":  "Serissa Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Serissa Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Shelves \u0026 Cabinets",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Shelves \u0026 Cabinets",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "s he lv es"
                     ]
    },
    {
        "name":  "Shop / Retail",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Shop / Retail",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "s ho p"
                     ]
    },
    {
        "name":  "Shop / Showroom Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Shop / Showroom Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "s ho p s ho wr oo m r en ov at io n"
                     ]
    },
    {
        "name":  "Shower Fitting",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Shower Fitting",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "s ho we r"
                     ]
    },
    {
        "name":  "Single",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Single",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "m at tr es s c le an in g"
                     ]
    },
    {
        "name":  "Site survey",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Site survey",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C ob we bC le an in gS ec ti on",
                         "h om e c ob we b c le an in g"
                     ]
    },
    {
        "name":  "Site survey",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Site survey",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "f ul l h om e p es t c on tr ol"
                     ]
    },
    {
        "name":  "Site survey - final cleaning rate after survey",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Site survey - final cleaning rate after survey",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B at hr oo mC le an in gS ec ti on",
                         "c om me rc ia l b at hr oo m c le an in g"
                     ]
    },
    {
        "name":  "Small Move",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Small Move",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "s ma ll"
                     ]
    },
    {
        "name":  "Small Office",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Small Office",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "s ma ll o ff ic e"
                     ]
    },
    {
        "name":  "Smart Switch \u0026 Automation Setup",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Smart Switch \u0026 Automation Setup",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "s ma rt s wi tc h a ut om at io n s et up"
                     ]
    },
    {
        "name":  "Snake Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Snake Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Sofa Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Sofa Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "s of a c le an in g s ec ti on"
                     ]
    },
    {
        "name":  "Sofa, Carpet \u0026 Mattress Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Sofa, Carpet \u0026 Mattress Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "l iv in g b ed ro om"
                     ]
    },
    {
        "name":  "Soil / Waste Pipe Installation",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Soil / Waste Pipe Installation",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "s oi l w as te"
                     ]
    },
    {
        "name":  "Spa \u0026 Salon Services",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s"
                     ]
    },
    {
        "name":  "Spa for Men",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Spa for Men",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "m en s pa"
                     ]
    },
    {
        "name":  "Spa for Women",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Spa for Women",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s pa f or w om en"
                     ]
    },
    {
        "name":  "Staircase cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Staircase cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "s ta ir ca se c le an in g"
                     ]
    },
    {
        "name":  "Starting treatment price",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Starting treatment price",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "c oc kr oa ch c on tr ol"
                     ]
    },
    {
        "name":  "Stomach Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Stomach Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s to ma ch"
                     ]
    },
    {
        "name":  "Stress Relief",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Stress Relief",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s tr es s r el ie f"
                     ]
    },
    {
        "name":  "Structural Steel Fabrication",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Structural Steel Fabrication",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "s te el s tr uc tu re"
                     ]
    },
    {
        "name":  "Study / Pooja room",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Study / Pooja room",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "s tu dy p oo ja r oo m"
                     ]
    },
    {
        "name":  "Swedish Relaxation Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Swedish Relaxation Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "s we di sh"
                     ]
    },
    {
        "name":  "Switch Fitting",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Switch Fitting",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "s wi tc h"
                     ]
    },
    {
        "name":  "Switchboard Fitting",
        "href":  "/services/electrical-works",
        "keywords":  [
                         "Switchboard Fitting",
                         "Electrical Works",
                         "e le ct ri ca l w or ks",
                         "E le ct ri ca lW or ks Ma rk et pl ac e",
                         "s wi tc hb oa rd"
                     ]
    },
    {
        "name":  "Tamarind Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Tamarind Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Tank Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Tank Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "d ee pC le an in gC at eg or ie s",
                         "t an k c le an in g"
                     ]
    },
    {
        "name":  "Tap / Nal Fitting",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Tap / Nal Fitting",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "t ap"
                     ]
    },
    {
        "name":  "Termite Control",
        "href":  "/services/pest-control",
        "keywords":  [
                         "Termite Control",
                         "Pest Control",
                         "p es t c on tr ol",
                         "P es tC on tr ol Ma rk et pl ac e",
                         "t er mi te c on tr ol"
                     ]
    },
    {
        "name":  "Terrace / open area",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Terrace / open area",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "t er ra ce o pe n a re a"
                     ]
    },
    {
        "name":  "Terrace Waterproof Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Terrace Waterproof Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "t er ra ce"
                     ]
    },
    {
        "name":  "Texture \u0026 Design Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Texture \u0026 Design Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "t ex tu re"
                     ]
    },
    {
        "name":  "Toilet Seat Fitting",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Toilet Seat Fitting",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "t oi le t s ea t"
                     ]
    },
    {
        "name":  "Truck-Mounted Crane",
        "href":  "/services/rental-services",
        "keywords":  [
                         "Truck-Mounted Crane",
                         "Rental Services",
                         "r en ta l s er vi ce s",
                         "R en ta lM ar ke tp la ce",
                         "t ru ck c ra ne"
                     ]
    },
    {
        "name":  "Tulsi Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Tulsi Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "TV Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "TV Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "t v c le an in g"
                     ]
    },
    {
        "name":  "TV Fitting \u0026 Repair",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "TV Fitting \u0026 Repair",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "t v"
                     ]
    },
    {
        "name":  "TV repair diagnosis",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "TV repair diagnosis",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "c he ck up"
                     ]
    },
    {
        "name":  "TV setup and connections",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "TV setup and connections",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "s et up"
                     ]
    },
    {
        "name":  "TV wall fitting",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "TV wall fitting",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "w al l f it"
                     ]
    },
    {
        "name":  "Underarms Waxing",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Underarms Waxing",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "u nd er ar ms"
                     ]
    },
    {
        "name":  "Underground Sump Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Underground Sump Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "u nd er gr ou nd s um p c le an in g"
                     ]
    },
    {
        "name":  "Unfurnished apartment - Home deep cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Unfurnished apartment - Home deep cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "u nf ur ni sh ed a pa rt me nt"
                     ]
    },
    {
        "name":  "Unfurnished bungalow \u0026 duplex cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Unfurnished bungalow \u0026 duplex cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "u nf ur ni sh ed b un ga lo w d up le x"
                     ]
    },
    {
        "name":  "Unfurnished villa cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Unfurnished villa cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lA pa rt me nt Se ct io n",
                         "u nf ur ni sh ed v il la c le an in g"
                     ]
    },
    {
        "name":  "Unloading Only",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Unloading Only",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "u nl oa di ng"
                     ]
    },
    {
        "name":  "Unpacking Only",
        "href":  "/services/packers-movers",
        "keywords":  [
                         "Unpacking Only",
                         "Packers \u0026 Movers",
                         "p ac ke rs m ov er s",
                         "P ac ke rs Mo ve rs Ma rk et pl ac e",
                         "u np ac ki ng"
                     ]
    },
    {
        "name":  "Up to 1000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Up to 1000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "o ve rh ea d w at er t an k c le an in g"
                     ]
    },
    {
        "name":  "Up to 5000 Litres",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Up to 5000 Litres",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "T an kC le an in gS ec ti on",
                         "u nd er gr ou nd s um p c le an in g"
                     ]
    },
    {
        "name":  "Upto 25 Sq ft",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Upto 25 Sq ft",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "L iv in gB ed ro om Cl ea ni ng Se ct io n",
                         "c ar pe t c le an in g"
                     ]
    },
    {
        "name":  "UPVC Drainage Pipe Installation - 110 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "UPVC Drainage Pipe Installation - 110 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "u pv c 110"
                     ]
    },
    {
        "name":  "UPVC Drainage Pipe Installation - 40/50 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "UPVC Drainage Pipe Installation - 40/50 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "u pv c 40 50"
                     ]
    },
    {
        "name":  "UPVC Drainage Pipe Installation - 75 mm",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "UPVC Drainage Pipe Installation - 75 mm",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "u pv c 75"
                     ]
    },
    {
        "name":  "Utility / Store room",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Utility / Store room",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "A pa rt me nt Re qu ir em en ts Mo da l",
                         "u ti li ty s to re r oo m"
                     ]
    },
    {
        "name":  "Utility Area Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Utility Area Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "u ti li ty a re a c le an in g"
                     ]
    },
    {
        "name":  "Vedic Signature Massage",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Vedic Signature Massage",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "v ed ic s ig na tu re"
                     ]
    },
    {
        "name":  "Vermicompost (5 kg)",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Vermicompost (5 kg)",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Vertical Garden",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Vertical Garden",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "v er ti ca l g ar de n"
                     ]
    },
    {
        "name":  "Vertical Garden Maintenance",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Vertical Garden Maintenance",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e"
                     ]
    },
    {
        "name":  "Villa / Independent House Renovation",
        "href":  "/services/renovation",
        "keywords":  [
                         "Villa / Independent House Renovation",
                         "Renovation",
                         "r en ov at io n",
                         "R en ov at io nM ar ke tp la ce",
                         "v il la i nd ep en de nt h ou se r en ov at io n"
                     ]
    },
    {
        "name":  "Villa Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Villa Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "F ul lH om eB yR oo mC le an in gS ec ti on",
                         "v il la c le an in g"
                     ]
    },
    {
        "name":  "Wardrobes \u0026 Cupboards",
        "href":  "/services/carpentry-interior-works",
        "keywords":  [
                         "Wardrobes \u0026 Cupboards",
                         "Carpentry \u0026 Interior Works",
                         "c ar pe nt ry i nt er io r w or ks",
                         "C ar pe nt ry In te ri or Ma rk et pl ac e",
                         "w ar dr ob e"
                     ]
    },
    {
        "name":  "Warehouse Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Warehouse Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "I nd us tr ia lC le an in gS ec ti on",
                         "w ar eh ou se c le an in g"
                     ]
    },
    {
        "name":  "Wash \u0026 Blow-Dry",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Wash \u0026 Blow-Dry",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "b lo w d ry"
                     ]
    },
    {
        "name":  "Washbasin Fitting",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Washbasin Fitting",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "b as in"
                     ]
    },
    {
        "name":  "Washing machine installation",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Washing machine installation",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "i ns ta ll at io n"
                     ]
    },
    {
        "name":  "Washing Machine Repair \u0026 Installation",
        "href":  "/services/appliance-repair",
        "keywords":  [
                         "Washing Machine Repair \u0026 Installation",
                         "Appliance Repair",
                         "a pp li an ce r ep ai r",
                         "A pp li an ce Re pa ir Ma rk et pl ac e",
                         "w as hi ng m ac hi ne"
                     ]
    },
    {
        "name":  "Water Tank Installation",
        "href":  "/services/plumbing-works",
        "keywords":  [
                         "Water Tank Installation",
                         "Plumbing Works",
                         "p lu mb in g w or ks",
                         "P lu mb in gW or ks Ma rk et pl ac e",
                         "w at er t an k"
                     ]
    },
    {
        "name":  "Waxing for Women",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Waxing for Women",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "w ax in g f or w om en"
                     ]
    },
    {
        "name":  "Welding \u0026 Metal Repair",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Welding \u0026 Metal Repair",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "w el di ng r ep ai r"
                     ]
    },
    {
        "name":  "Window \u0026 glass cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Window \u0026 glass cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "B un ga lo wS ur ve yM od al",
                         "w in do w g la ss c le an in g"
                     ]
    },
    {
        "name":  "Window Grills \u0026 Railings",
        "href":  "/services/fabrication-works",
        "keywords":  [
                         "Window Grills \u0026 Railings",
                         "Fabrication Works",
                         "f ab ri ca ti on w or ks",
                         "F ab ri ca ti on Wo rk sM ar ke tp la ce",
                         "g ri ll s r ai li ng"
                     ]
    },
    {
        "name":  "Window, Grill \u0026 Glass Cleaning",
        "href":  "/services/deep-cleaning",
        "keywords":  [
                         "Window, Grill \u0026 Glass Cleaning",
                         "Deep Cleaning",
                         "d ee p c le an in g",
                         "C us to mi ze Cl ea ni ng Se ct io n",
                         "w in do w g ri ll g la ss c le an in g"
                     ]
    },
    {
        "name":  "Wine Glow Facial",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Wine Glow Facial",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "f ir mi ng w in e"
                     ]
    },
    {
        "name":  "Women",
        "href":  "/services/spa-salon-services",
        "keywords":  [
                         "Women",
                         "Spa \u0026 Salon Services",
                         "s pa s al on s er vi ce s",
                         "S pa Sa lo nM ar ke tp la ce",
                         "h ai rc ut"
                     ]
    },
    {
        "name":  "Wood \u0026 Metal Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Wood \u0026 Metal Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "w oo d m et al"
                     ]
    },
    {
        "name":  "Wrightia Bonsai",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Wrightia Bonsai",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "Yellow \u0026 Black Safety Painting",
        "href":  "/services/painting-services",
        "keywords":  [
                         "Yellow \u0026 Black Safety Painting",
                         "Painting Services",
                         "p ai nt in g s er vi ce s",
                         "P ai nt in gS er vi ce sM ar ke tp la ce",
                         "s af et y"
                     ]
    },
    {
        "name":  "Yellow Rose",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "Yellow Rose",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    },
    {
        "name":  "ZZ Plant",
        "href":  "/services/gardening-landscaping",
        "keywords":  [
                         "ZZ Plant",
                         "Gardening \u0026 Landscaping",
                         "g ar de ni ng l an ds ca pi ng",
                         "G ar de ni ng Ma rk et pl ac e",
                         "p la nt Na me s"
                     ]
    }
] as const;

function normalizeServiceSearch(
  value: string,
): string {
  return value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildServiceSearchTargetHref(
  href: string,
  serviceName: string,
): string {
  const target = serviceName.trim();

  if (!target) {
    return href;
  }

  const hashIndex = href.indexOf("#");

  const hash =
    hashIndex >= 0
      ? href.slice(hashIndex)
      : "";

  const base =
    hashIndex >= 0
      ? href.slice(0, hashIndex)
      : href;

  const separator =
    base.includes("?")
      ? "&"
      : "?";

  return `${base}${separator}ccTarget=${encodeURIComponent(target)}${hash}`;
}
function getServiceSearchResults(
  query: string,
) {
  const normalizedQuery =
    normalizeServiceSearch(query);

  if (!normalizedQuery) {
    return [];
  }

  const queryWords =
    normalizedQuery
      .split(" ")
      .filter(Boolean);

  const ranked = SERVICE_SEARCH_ITEMS.map(
    (service) => {
      const normalizedName =
        normalizeServiceSearch(
          service.name,
        );

      const nameWords =
        normalizedName
          .split(" ")
          .filter(Boolean);

      let directScore =
        Number.POSITIVE_INFINITY;

      if (
        normalizedName ===
        normalizedQuery
      ) {
        directScore = 0;
      } else if (
        normalizedName.startsWith(
          normalizedQuery,
        )
      ) {
        directScore = 1;
      } else if (
        nameWords.some((word) =>
          word.startsWith(
            normalizedQuery,
          ),
        )
      ) {
        directScore = 2;
      } else if (
        normalizedName.includes(
          normalizedQuery,
        )
      ) {
        directScore = 3;
      } else if (
        queryWords.every((queryWord) =>
          nameWords.some(
            (nameWord) =>
              nameWord.startsWith(
                queryWord,
              ) ||
              nameWord.includes(
                queryWord,
              ),
          ),
        )
      ) {
        directScore = 4;
      }

      const normalizedKeywords =
        normalizeServiceSearch(
          service.keywords.join(" "),
        );

      const keywordWords =
        normalizedKeywords
          .split(" ")
          .filter(Boolean);

      let keywordScore =
        Number.POSITIVE_INFINITY;

      if (
        queryWords.every((queryWord) =>
          keywordWords.some(
            (keywordWord) =>
              keywordWord.startsWith(
                queryWord,
              ),
          ),
        )
      ) {
        keywordScore = 10;
      } else if (
        queryWords.every(
          (queryWord) =>
            normalizedKeywords.includes(
              queryWord,
            ),
        )
      ) {
        keywordScore = 11;
      }

      return {
        service,
        directScore,
        keywordScore,
      };
    },
  );

  const directMatches = ranked
    .filter(
      (result) =>
        Number.isFinite(
          result.directScore,
        ),
    )
    .sort((a, b) => {
      if (
        a.directScore !==
        b.directScore
      ) {
        return (
          a.directScore -
          b.directScore
        );
      }

      return (
        a.service.name.length -
        b.service.name.length
      );
    });

  /*
   * Important:
   * If actual service-name matches exist,
   * show ONLY those.
   *
   * This prevents a search such as "deep"
   * from displaying unrelated services merely
   * because their parent category contains
   * "Deep Cleaning".
   */
  if (directMatches.length > 0) {
    return directMatches
      .slice(0, 12)
      .map(
        (result) =>
          result.service,
      );
  }

  /*
   * Keywords are fallback aliases only.
   * They are used when the typed text does not
   * match an actual service name.
   */
  return ranked
    .filter(
      (result) =>
        Number.isFinite(
          result.keywordScore,
        ),
    )
    .sort((a, b) => {
      if (
        a.keywordScore !==
        b.keywordScore
      ) {
        return (
          a.keywordScore -
          b.keywordScore
        );
      }

      return a.service.name.localeCompare(
        b.service.name,
      );
    })
    .slice(0, 12)
    .map(
      (result) =>
        result.service,
    );
}
function LocationIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-5.686 7-12A7 7 0 1 0 5 9c0 6.314 7 12 7 12Z"
      />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

function SearchIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path
        strokeLinecap="round"
        d="m20 20-4-4"
      />
    </svg>
  );
}

function CartIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h2l1.6 10.1a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 2-1.6L20 7H6"
      />
      <circle cx="9" cy="20" r="1" />
      <circle cx="17" cy="20" r="1" />
    </svg>
  );
}

function AccountIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="4" />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 21a7.5 7.5 0 0 1 15 0"
      />
    </svg>
  );
}

function ChevronIcon({
  expanded = false,
}: {
  expanded?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
        expanded ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </svg>
  );
}

function CloseIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l12 12M18 6 6 18"
      />
    </svg>
  );
}

function CurrentLocationIcon({
  className = "h-5 w-5",
}: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="7" />

      <path
        strokeLinecap="round"
        d="M12 2v3M12 19v3M2 12h3M19 12h3"
      />
    </svg>
  );
}

type ToolButtonProps = {
  label: string;
  expanded: boolean;
  onClick: () => void;
  children: ReactNode;
  showCartCount?: boolean;
  cartCount?: number;
};

function ToolButton({
  label,
  expanded,
  onClick,
  children,
  showCartCount = false,
  cartCount = 0,
}: ToolButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls="services-marketplace-panel"
      onClick={onClick}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dedede] bg-white text-[#202124] transition-colors duration-200 hover:border-[#ef1b23] hover:bg-red-50 hover:text-[#ef1b23] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:h-11 sm:w-11"
    >
      {children}

      {showCartCount && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ef1b23] px-1 text-[10px] font-bold text-white">
          {cartCount}
        </span>
      )}
    </button>
  );
}

export default function ServicesMarketplaceNavbar() {
  const router = useRouter();

  const cartSnapshot = useSyncExternalStore(
    subscribeDeepCleaningCart,
    getDeepCleaningCartSnapshot,
    getDeepCleaningCartServerSnapshot,
  );

  const cartItems =
    parseDeepCleaningCartSnapshot(cartSnapshot);

  const cartCount = cartItems.length;

  const toolbarRef = useRef<HTMLElement>(null);

  const [openPanel, setOpenPanel] =
    useState<OpenPanel>(null);

  const [location, setLocation] = useState(() => {
    if (typeof window === "undefined") {
      return "Select location";
    }

    return (
      window.localStorage
        .getItem(LOCATION_STORAGE_KEY)
        ?.trim() || "Select location"
    );
  });

  const [locationDraft, setLocationDraft] =
    useState("");

  const [locationMessage, setLocationMessage] =
    useState("");

  const [
    isDetectingLocation,
    setIsDetectingLocation,
  ] = useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [searchOpen, setSearchOpen] =
    useState(false);

  const searchResults =
    getServiceSearchResults(searchQuery);

  useEffect(() => {
    const handlePointerDown = (
      event: PointerEvent,
    ) => {
      if (
        openPanel !== "location" &&
        toolbarRef.current &&
        !toolbarRef.current.contains(
          event.target as Node,
        )
      ) {
        setOpenPanel(null);
      }
    };

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (event.key === "Escape") {
        setOpenPanel(null);
      }
    };

    document.addEventListener(
      "pointerdown",
      handlePointerDown,
    );

    document.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handlePointerDown,
      );

      document.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [openPanel]);

  useEffect(() => {
    if (openPanel !== "location") {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [openPanel]);

  const togglePanel = (
    panel: Exclude<OpenPanel, null>,
  ) => {
    setOpenPanel((current) =>
      current === panel ? null : panel,
    );

    if (panel === "location") {
      setLocationMessage("");
    }
  };

  const saveLocation = (
    nextLocation: string,
  ) => {
    setLocation(nextLocation);

    window.localStorage.setItem(
      LOCATION_STORAGE_KEY,
      nextLocation,
    );
  };

  const handleLocationSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const nextLocation =
      locationDraft.trim();

    if (!nextLocation) {
      setLocationMessage(
        "Enter your area, landmark, city or PIN code.",
      );

      return;
    }

    saveLocation(nextLocation);

    window.localStorage.removeItem(
      LOCATION_COORDS_STORAGE_KEY,
    );

    setLocationDraft("");
    setLocationMessage("");
    setOpenPanel(null);
  };

  const handleDetectCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationMessage(
        "Current location is not supported by this browser.",
      );

      return;
    }

    setIsDetectingLocation(true);

    setLocationMessage(
      "Detecting your current location...",
    );

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude:
            position.coords.latitude,
          longitude:
            position.coords.longitude,
          accuracy:
            position.coords.accuracy,
        };

        saveLocation("Current location");

        window.localStorage.setItem(
          LOCATION_COORDS_STORAGE_KEY,
          JSON.stringify(coordinates),
        );

        setIsDetectingLocation(false);
        setLocationMessage("");
        setOpenPanel(null);
      },
      (error) => {
        setIsDetectingLocation(false);

        if (error.code === 1) {
          setLocationMessage(
            "Location permission is blocked. Allow location access in your browser and try again.",
          );

          return;
        }

        if (error.code === 2) {
          setLocationMessage(
            "Your location could not be detected. Enter your area or PIN code manually.",
          );

          return;
        }

        if (error.code === 3) {
          setLocationMessage(
            "Location detection timed out. Please try again.",
          );

          return;
        }

        setLocationMessage(
          "Location could not be detected. Enter it manually.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    );
  };

  const openServiceSearchResult = (
    href: string,
    serviceName: string,
  ) => {
    setSearchQuery("");
    setSearchOpen(false);

    const targetHref =
      buildServiceSearchTargetHref(
        href,
        serviceName,
      );

    router.push(targetHref);

    window.setTimeout(() => {
      window.dispatchEvent(
        new Event(
          "citycoolies:service-search-target",
        ),
      );
    }, 180);
  };

  const handleSearchSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const firstResult = searchResults[0];

    if (!firstResult) {
      setSearchOpen(true);
      return;
    }

    openServiceSearchResult(
      firstResult.href,
      firstResult.name,
    );
  };

  const locationExpanded =
    openPanel === "location";

  const cartExpanded =
    openPanel === "cart";


  return (
    <section
      ref={toolbarRef}
      aria-label="Services marketplace tools"
      className="relative border-b border-[#e8e8e8] bg-white shadow-[0_14px_35px_-30px_rgba(40,40,40,0.4)]"
    >
      <div className="mx-auto flex h-[72px] max-w-[1480px] items-center gap-2 px-3 sm:gap-3 sm:px-6 lg:h-[76px] lg:px-10">
        <button
          type="button"
          aria-expanded={locationExpanded}
          aria-controls="city-coolies-location-dialog"
          onClick={() =>
            togglePanel("location")
          }
          className={`flex h-11 min-w-0 flex-[0.9] items-center gap-2 rounded-xl border bg-white px-3 text-left text-[13px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23] sm:flex-[0.75] sm:px-4 sm:text-[14px] lg:h-12 lg:max-w-[360px] ${
            locationExpanded
              ? "border-[#ef1b23] text-[#202124] shadow-[0_8px_22px_-16px_rgba(239,27,35,0.75)]"
              : "border-[#dedede] text-[#666] hover:border-[#ef1b23]"
          }`}
        >
          <LocationIcon className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

          <span className="min-w-0 flex-1 truncate">
            {location}
          </span>

          <ChevronIcon
            expanded={locationExpanded}
          />
        </button>

        <form
          onSubmit={handleSearchSubmit}
          onFocus={() => setSearchOpen(true)}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(
                event.relatedTarget,
              )
            ) {
              setSearchOpen(false);
            }
          }}
          className="relative min-w-0 flex-[1.1] lg:flex-1"
          role="search"
        >
          <label
            htmlFor="services-marketplace-search"
            className="sr-only"
          >
            Search City Coolies services
          </label>

          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#666] sm:left-4 sm:h-5 sm:w-5" />

          <input
            id="services-marketplace-search"
            type="text"
            role="combobox"
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(
                event.target.value,
              );
              setSearchOpen(true);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setSearchOpen(false);
                event.currentTarget.blur();
              }
            }}
            placeholder="Search services"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={
              searchOpen &&
              searchQuery.trim().length > 0
            }
            aria-controls="city-coolies-service-search-results"
            className="h-11 w-full rounded-xl border border-[#dedede] bg-white pl-9 pr-3 text-[16px] text-[#202124] outline-none transition-colors placeholder:text-[#777] focus:border-[#ef1b23] focus:ring-2 focus:ring-red-100 sm:pl-12 sm:pr-4 lg:h-12"
          />

          {searchOpen &&
            searchQuery.trim().length > 0 && (
              <div
                id="city-coolies-service-search-results"
                role="listbox"
                aria-label="Service search results"
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-[250] overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.16)]"
              >
                {searchResults.length > 0 ? (
                  <div className="py-1.5">
                    {searchResults.map(
                      (service) => (
                        <button
                          key={`${service.href}::${service.name}`}
                          type="button"
                          role="option"
                          aria-selected="false"
                          onPointerDown={(event) =>
                            event.preventDefault()
                          }
                          onClick={() =>
                            openServiceSearchResult(
                              service.href,
                              service.name,
                            )
                          }
                          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-red-50 focus:bg-red-50 focus:outline-none"
                        >
                          <span className="min-w-0">
                            <span className="block truncate text-[14px] font-semibold text-[#202124]">
                              {service.name}
                            </span>

                            <span className="mt-0.5 block text-[11px] text-[#777]">
                              City Coolies service
                            </span>
                          </span>
                        </button>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="px-4 py-4">
                    <p className="text-[13px] font-semibold text-[#303030]">
                      No matching service found
                    </p>

                    <p className="mt-1 text-[12px] leading-5 text-[#777]">
                      Try another service name such as cleaning, plumbing, painting, salon or appliance repair.
                    </p>
                  </div>
                )}
              </div>
            )}
        </form>

        <ToolButton
          label="Open service cart"
          expanded={cartExpanded}
          onClick={() =>
            togglePanel("cart")
          }
          showCartCount
          cartCount={cartCount}
        >
          <CartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </ToolButton>

        <CustomerAccountControl variant="icon" />
      </div>

      {locationExpanded && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 px-4 py-6"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpenPanel(null);
            }
          }}
        >
          <div
            id="city-coolies-location-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="city-coolies-location-title"
            className="w-full max-w-[560px] overflow-hidden rounded-[14px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.26)]"
          >
            <div className="flex h-[76px] items-center justify-between border-b border-[#e5e7eb] px-5 sm:px-6">
              <div className="flex min-w-0 items-center gap-2">
                <h2
                  id="city-coolies-location-title"
                  className="max-w-[360px] truncate text-[16px] font-semibold text-[#30343b]"
                >
                  {location === "Select location"
                    ? "Select location"
                    : location}
                </h2>

                {location !== "Select location" && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocationDraft("");
                      setLocationMessage("");
                    }}
                    className="shrink-0 text-[12px] font-semibold text-[#ef1b23] underline-offset-2 hover:underline"
                  >
                    Change
                  </button>
                )}
              </div>

              <button
                type="button"
                aria-label="Close location selector"
                onClick={() => setOpenPanel(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f5] text-[#666] transition-colors hover:bg-[#eeeeee] hover:text-[#202124] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ef1b23]"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-5 pt-5 sm:px-6 sm:pt-5">
              <form onSubmit={handleLocationSubmit}>
                <label
                  htmlFor="services-location-input"
                  className="sr-only"
                >
                  Search your area or landmark
                </label>

                <div className="relative">
                  <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#777]" />

                  <input
                    id="services-location-input"
                    type="text"
                    value={locationDraft}
                    onChange={(event) => {
                      setLocationDraft(event.target.value);
                      setLocationMessage("");
                    }}
                    placeholder="Search your area or landmark"
                    autoComplete="postal-code"
                    autoFocus
                    className="h-[54px] w-full rounded-[8px] border border-[#d9dde3] bg-white pl-12 pr-4 text-[15px] text-[#202124] outline-none transition-colors placeholder:text-[#8a8f98] focus:border-[#ef1b23] focus:ring-1 focus:ring-[#ef1b23]"
                  />
                </div>
              </form>

              <button
                type="button"
                disabled={isDetectingLocation}
                onClick={handleDetectCurrentLocation}
                className="mt-4 inline-flex items-center gap-2 text-[14px] font-semibold text-[#ef1b23] transition-opacity hover:opacity-75 disabled:cursor-wait disabled:opacity-50"
              >
                <CurrentLocationIcon className="h-[18px] w-[18px] shrink-0" />

                <span>
                  {isDetectingLocation
                    ? "Detecting my location..."
                    : "Detect my location"}
                </span>

                {!isDetectingLocation && (
                  <span className="font-normal text-[#ef1b23]">
                    (recommended)
                  </span>
                )}
              </button>

              {locationMessage && (
                <p
                  role="status"
                  className="mt-3 text-[12px] font-medium leading-5 text-[#c71820]"
                >
                  {locationMessage}
                </p>
              )}
            </div>

            <div className="mt-5 border-t border-[#e5e7eb]">
              <div className="flex min-h-[245px] flex-col items-center justify-center px-6 pb-8 pt-7 text-center">
                <LocationIcon className="h-10 w-10 text-[#687386]" />

                <p className="mt-5 max-w-[430px] text-[14px] leading-6 text-[#687386]">
                  We use your location only to show City Coolies services available near you.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartExpanded && (
        <div
          id="services-marketplace-panel"
          className="absolute inset-x-0 top-full border-t border-red-100 bg-white shadow-[0_24px_45px_-24px_rgba(35,35,35,0.28)]"
        >
          <div className="mx-auto max-w-[1480px] px-4 py-4 sm:px-6 lg:px-10">
            {cartExpanded && (
              <div className="flex min-h-24 items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-50 text-[#ef1b23]">
                  <CartIcon />
                </div>

                <div>
                  <p className="text-[16px] font-semibold text-[#202124]">
                    {cartCount > 0
                      ? `${cartCount} service${
                          cartCount === 1
                            ? ""
                            : "s"
                        } in your cart`
                      : "Your service cart is empty"}
                  </p>

                  <p className="mt-1 text-[13px] text-[#666]">
                    Services added during booking will appear here.
                  </p>
                </div>
              </div>
            )}


          </div>
        </div>
      )}
    </section>
  );
}