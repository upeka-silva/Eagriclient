import React, { createContext, useContext, useState, useEffect } from "react";

const ServiceContext = createContext();

export const useServiceContext = () => useContext(ServiceContext);

export const ServiceProvider = ({ children }) => {
  const [service, setService] = useState(() => {
    const storedService = localStorage.getItem("storedService");

    return storedService ? JSON.parse(storedService) : null;
  });

  useEffect(() => {
    if (service) {
      localStorage.setItem("storedService", JSON.stringify(service));
    }

  }, [service]);

  return (
      <ServiceContext.Provider value={{ service, setService }}>
        {children}
      </ServiceContext.Provider>
  );
};
