"use client";

import { useState } from "react";
import MuxUploader from "@mux/mux-uploader-react";
import { addDataToUpload } from "./actions";
import FormStatusButton from "./pending-button";

type FormProps = {
  uploadId: string;
  endpoint: string;
};
export default function Form({ uploadId, endpoint }: FormProps) {
  const [uploaded, setUploaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      action={async (formData) => {
        setError(null);
        const response = await addDataToUpload(uploadId, formData);
        if (response?.error) setError(response.error);
      }}
    >
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" />
      <label htmlFor="description">Description</label>
      <textarea name="description" id="description" />
      <MuxUploader endpoint={endpoint} onSuccess={() => setUploaded(true)} />
      <FormStatusButton disabled={!uploaded}>Submit</FormStatusButton>
      {error && <p>{error}</p>}
    </form>
  );
}
