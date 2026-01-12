import stringifyQueryParams from "@/utils/stringifyQueryParams";
import type { PaginationResponse, Vendor, VendorQueryParams } from "@/redux/types/vendor";
import type { VendorFormValues } from "@/utils/vendorFormSchema";

const BASE_URL = "http://localhost:8000/vendors/";

export async function getVendors(
  params: VendorQueryParams
): Promise<PaginationResponse<Vendor>> {
  const query = stringifyQueryParams(params);

  const res = await fetch(`${BASE_URL}?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch vendors");
  }

  return res.json();
}


export async function addVendor(
  payload: VendorFormValues
) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Failed to create vendor");
  }

  return res.json();
}
