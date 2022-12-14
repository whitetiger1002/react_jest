import useSWR, { mutate } from 'swr'
import { definitions, DataFetcher } from '@/types'
import { fetchWithToken } from '@/lib/fetchWithToken'

const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/patient-annotations?patient-id={patientId}&count=1`

export const usePatientAnnotations = (
  patientId: definitions['Patient']['patientId'],
  token: string,
  realm: string
): DataFetcher<definitions['ArrayOfPatientAnnotations']> => {
  const { data, error } = useSWR<definitions['ArrayOfPatientAnnotations']>(
    () =>
      patientId && token && realm ? [url.replace('{patientId}', patientId), token, realm] : null,
    fetchWithToken
  )
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}

export const revalidatePatientAnnotations = (
  patientId: definitions['Patient']['patientId'],
  token: string,
  realm: string
): Promise<void> => mutate([url.replace('{patientId}', patientId), token, realm])
