import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Team, UserSearchView, InvitationDto, UserProfile, User, Game } from '../model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.api;
  constructor(private http: HttpClient) { }

  createTeam(team: Team) {
    return this.http.post<Team>(`${this.url}/team`, team)
      .pipe(catchError(this.errorHandler));
  }

  updateTeam(team: Team) {
    return this.http.put<Team>(`${this.url}/team`, team)
      .pipe(catchError(this.errorHandler));
  }

  deleteTeam(id: string) {
    return this.http.delete<any>(`${this.url}/team/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getMyTeams() {
    return this.http.get<Array<Team>>(`${this.url}/team/created/teams`)
      .pipe(catchError(this.errorHandler));
  }

  getMyGames() {
    return this.http.get<Array<Game>>(`${this.url}/game/get/mygames`)
      .pipe(catchError(this.errorHandler));
  }

  searchPlayersForInvitation(field: string) {
    return this.http.get<Array<UserSearchView>>(`${this.url}/user/search/${field}`)
      .pipe(catchError(this.errorHandler));
  }

  sendInvitation(teamId: string, userToId: string, comments: string) {
    return this.http.post<InvitationDto>(`${this.url}/invitation/invites/${teamId}/${userToId}/${comments}`, {})
      .pipe(catchError(this.errorHandler));
  }

  reSendInvitation(id: string) {
    return this.http.post<InvitationDto>(`${this.url}/invitation/resend/invite/${id}`, {})
      .pipe(catchError(this.errorHandler));
  }

  getMembersAndInvites(id: string) {
    return this.http.get<Array<InvitationDto>>(`${this.url}/team/members/pending/invites/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getProfile() {
    return this.http.get<UserProfile>(`${this.url}/user/profile`)
      .pipe(catchError(this.errorHandler));
  }

  joinDeclineTeam(st: number, id: string) {
    return this.http.post<boolean>(`${this.url}/invitation/reply/${st}/${id}`, {})
      .pipe(catchError(this.errorHandler));
  }

  getAllUsers() {
    return this.http.get<Array<User>>(`${this.url}/user`)
      .pipe(catchError(this.errorHandler));
  }

  enableDisableUser(userId: string, status: boolean) {
    return this.http.post<User>(`${this.url}/user/activate/${userId}/${status}`, {})
      .pipe(catchError(this.errorHandler));
  }

  resetpassword(id: string) {
    return this.http.post<boolean>(`${this.url}/user/resetpassword/${id}`, {})
      .pipe(catchError(this.errorHandler));
  }

  changepassword(current: string, newpassword: string) {
    return this.http.post<boolean>(`${this.url}/user/changepassword/${current}/${newpassword}`, {})
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error || 'Server Error');
  }
}
