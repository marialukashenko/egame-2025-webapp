import axios from 'axios';
import type { Team, TeamDTO} from '../types';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

async function createTeam(data: TeamDTO): Promise<Team> {
    const response = await api.post('/teams', data);
    return response.data as Team;
}

export default {
    createTeam,
};