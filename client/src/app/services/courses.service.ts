import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, IResponse } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>('api/courses');
  }

  getCourse(id: string): Observable<ICourse> {
    return this.http.get<ICourse>(`api/courses/${id}`);
  }

  createCourse(course: ICourse): Observable<IResponse> {
    return this.http.post<IResponse>('api/courses/add', course);
  }

  editCourse(course: ICourse, id: string): Observable<IResponse> {
    return this.http.patch<IResponse>(`api/courses/edit/${id}`, course);
  }

  deleteCourse(id: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`api/courses/${id}`);
  }
}
