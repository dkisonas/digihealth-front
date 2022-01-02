import { fetchJson } from '../utils/HttpUtils';
import moment from 'moment';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const dateFormat = 'yyyy-MM-DD[T]hh:mm:ss.SSS[Z]';

const getUsersFullName = (users, id) => {
  const user = users.find((u) => u.id === id);
  return `${user.firstName} ${user.lastName}`;
};

async function formatVisitForDisplay(visit) {
  const doctors = await fetchJson(`/Doctor/getAll`);
  const patients = await fetchJson(`/Patient/getAllPatient`);
  return {
    id: visit.id,
    name: visit.name,
    description: visit.description,
    status: visit.status,
    date: moment(visit.startDate).parseZone().format('yyyy-MM-DD hh:mm'),
    endDate: visit.endDate,
    doctorId: visit.doctorId,
    doctorName: getUsersFullName(doctors, visit.doctorId),
    patientId: visit.patientId,
    patientName: getUsersFullName(patients, visit.patientId),
  };
}

function formatVisitForRequest(visit) {
  return {
    id: visit.id,
    name: visit.name,
    description: visit.description,
    status: visit.status,
    startDate: moment(visit.date).format(dateFormat),
    endDate: visit.endDate,
    doctorId: visit.doctorId,
    patientId: visit.patientId,
  };
}

async function formatVisits(visits) {
  const formattedVisits = visits.map(
    async (visit) => await formatVisitForDisplay(visit)
  );
  const result = await Promise.all(formattedVisits);
  return result;
}

export { formatVisits, formatVisitForDisplay, formatVisitForRequest };
