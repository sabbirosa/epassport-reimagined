"use client";

import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";

import type {
    ApplicationValues,
    ContactInfoValues,
    DocumentsValues,
    PassportDetailsValues,
    PaymentValues,
    PersonalInfoValues,
} from "@/lib/validations/application";

type ApplicationState = {
  currentStep: number;
  personalInfo: Partial<PersonalInfoValues>;
  contactInfo: Partial<ContactInfoValues>;
  passportDetails: Partial<PassportDetailsValues>;
  documents: Partial<DocumentsValues>;
  payment: Partial<PaymentValues>;
  applicationId?: string;
  applicationStatus: ApplicationValues["applicationStatus"];
};

type ApplicationContextType = {
  applicationState: ApplicationState;
  updatePersonalInfo: (data: Partial<PersonalInfoValues>) => void;
  updateContactInfo: (data: Partial<ContactInfoValues>) => void;
  updatePassportDetails: (data: Partial<PassportDetailsValues>) => void;
  updateDocuments: (data: Partial<DocumentsValues>) => void;
  updatePayment: (data: Partial<PaymentValues>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetApplication: () => void;
  updateApplicationStatus: (status: ApplicationValues["applicationStatus"]) => void;
};

const defaultApplicationState: ApplicationState = {
  currentStep: 1,
  personalInfo: {},
  contactInfo: {},
  passportDetails: {},
  documents: {},
  payment: {},
  applicationStatus: "draft",
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applicationState, setApplicationState] = useState<ApplicationState>(
    defaultApplicationState
  );

  const updatePersonalInfo = useCallback(
    (data: Partial<PersonalInfoValues>) => {
      setApplicationState((prevState) => ({
        ...prevState,
        personalInfo: { ...prevState.personalInfo, ...data },
      }));
    },
    []
  );

  const updateContactInfo = useCallback((data: Partial<ContactInfoValues>) => {
    setApplicationState((prevState) => ({
      ...prevState,
      contactInfo: { ...prevState.contactInfo, ...data },
    }));
  }, []);

  const updatePassportDetails = useCallback(
    (data: Partial<PassportDetailsValues>) => {
      setApplicationState((prevState) => ({
        ...prevState,
        passportDetails: { ...prevState.passportDetails, ...data },
      }));
    },
    []
  );

  const updateDocuments = useCallback((data: Partial<DocumentsValues>) => {
    setApplicationState((prevState) => ({
      ...prevState,
      documents: { ...prevState.documents, ...data },
    }));
  }, []);

  const updatePayment = useCallback((data: Partial<PaymentValues>) => {
    setApplicationState((prevState) => ({
      ...prevState,
      payment: { ...prevState.payment, ...data },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setApplicationState((prevState) => ({
      ...prevState,
      currentStep: Math.min(prevState.currentStep + 1, 6),
    }));
  }, []);

  const prevStep = useCallback(() => {
    setApplicationState((prevState) => ({
      ...prevState,
      currentStep: Math.max(prevState.currentStep - 1, 1),
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setApplicationState((prevState) => ({
      ...prevState,
      currentStep: Math.max(1, Math.min(step, 6)),
    }));
  }, []);

  const resetApplication = useCallback(() => {
    setApplicationState(defaultApplicationState);
  }, []);

  const updateApplicationStatus = useCallback(
    (status: ApplicationValues["applicationStatus"]) => {
      setApplicationState((prevState) => ({
        ...prevState,
        applicationStatus: status,
      }));
    },
    []
  );

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        updatePersonalInfo,
        updateContactInfo,
        updatePassportDetails,
        updateDocuments,
        updatePayment,
        nextStep,
        prevStep,
        goToStep,
        resetApplication,
        updateApplicationStatus,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplication must be used within an ApplicationProvider");
  }
  return context;
} 