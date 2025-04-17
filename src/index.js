import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import featureitemSlice from "./feature.js";
import bagitemSlice from "./bag.js";
import browsingitemSlice from "./browsing.js";
import uniqueitemSlice from "./unique.js";
import itemsSlice from "./items.js";
import houseitemSlice from "./house.js";
import menitemSlice from "./men.js";
import sportsitemSlice from "./sports.js";
import beautyitemSlice from "./beauty.js";
import womenitemSlice from "./women.js";
import wishlistitemSlice from "./wishlist.js";
import luggageitemSlice from "./luggage.js";
import electronicsitemSlice from "./electronics.js";
import fetchStatusSlice from "./fetching.js";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["bagitem", "wishlistitem", "items"],
};

const rootReducer = {
  items: itemsSlice.reducer,
  browsingitem: browsingitemSlice.reducer,
  featureitem: featureitemSlice.reducer,
  uniqueitem: uniqueitemSlice.reducer,
  menitem: menitemSlice.reducer,
  houseitem: houseitemSlice.reducer,
  womenitem: womenitemSlice.reducer,
  wishlistitem: wishlistitemSlice.reducer,
  sportsitem: sportsitemSlice.reducer,
  luggageitem: luggageitemSlice.reducer,
  electronicsitem: electronicsitemSlice.reducer,
  beautyitem: beautyitemSlice.reducer,
  bagitem: bagitemSlice.reducer,
  fetchStatus: fetchStatusSlice.reducer,
};

// Apply persist reducer
const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

// ✅ Now configure store with serializable check suppression
const sypreenstore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(sypreenstore);

export default sypreenstore;
