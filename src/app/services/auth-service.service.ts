import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated: boolean = false;
  private readonly url = 'https://dotdesigns.site';

  constructor(private http: HttpClient) {}

  signUp(data: any) {
    return this.http.post(`${this.url}/signUp`, data, {
      withCredentials: true,
    });
  }

  login(Data: any, method: string) {
    return this.http.post(
      `${this.url}/login`,
      { Data, method },
      { withCredentials: true }
    );
  }

  verify_user_email(id: any, token: any) {
    let data = { id, token };
    return this.http.patch(`${this.url}/verify`, data, {
      withCredentials: true,
    });
  }

  verifyEmailforForget(email: string) {
    return this.http.get(`${this.url}/verifyEmailforForget/${email}`, {
      withCredentials: true,
    });
  }

  changePassword(data: any) {
    return this.http.patch(
      `${this.url}/changePassword/${data}`,
      { data },
      { withCredentials: true }
    );
  }

  user() {
    return this.http.get(`${this.url}/user`, { withCredentials: true });
  }

  getUser(id: any) {
    return this.http.get(`${this.url}/getUser/${id}`,{withCredentials:true})
  }

  user_logout() {
    return this.http.post(`${this.url}/logout`, {}, { withCredentials: true });
  }

  retrive_DesignsbyId(id: any) {
    return this.http.get(`${this.url}/retrive_DesignbyId/${id}`, {
      withCredentials: true,
    });
  }

  getDesignDetails(id: any) {
    return this.http.get(`${this.url}/getDesignDetails/${id}`, {
      withCredentials: true,
    });
  }

  addTowhishlist(id: any) {
    const data = {
      id: id,
    };
    return this.http.post(`${this.url}/addTowhishlist`, data, {
      withCredentials: true,
    });
  }

  getWishlistDesigns() {
    return this.http.get(`${this.url}/getWishlistDesigns`, {
      withCredentials: true,
    });
  }

  removeFromWishlist(id: any) {
    const data = { id: id };
    return this.http.post(`${this.url}/removeFromWishlist`, data, {
      withCredentials: true,
    });
  }

  getFeedbacks(id: string) {
    return this.http.get(`${this.url}/getFeedbacks/${id}`, {
      withCredentials: true,
    });
  }

  bookingRequest(formData: any, designerId: any, designId: any) {
    const data = { formData, designerId, designId };
    return this.http.post(`${this.url}/bookingRequest`, data, {
      withCredentials: true,
    });
  }

  makePayment(stripeToken: any, amount: number, id: any) {
    const data = { stripeToken, amount, id };
    return this.http.post(`${this.url}/feePayment`, data, {
      withCredentials: true,
    });
  }

  rejectBooking(id: any) {
    return this.http.patch(`${this.url}/rejectBooking/${id}`, {
      withCredentials: true,
    });
  }

  rejectPayment(id: any) {
    return this.http.patch(`${this.url}/rejectPayment/${id}`, {
      withCredentials: true,
    });
  }

  cancellConsultation(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/cancellConsultation`, bookings, {
      withCredentials: true,
    });
  }

  cancellProject(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/cancellProject`, bookings, {
      withCredentials: true,
    });
  }

  get_last_booking() {
    return this.http.get(`${this.url}/get_last_booking`, {
      withCredentials: true,
    });
  }

  getbookings() {
    return this.http.get(`${this.url}/getbookings`, { withCredentials: true });
  }

  booking_detail(id: any) {
    return this.http.get(`${this.url}/booking_detail/${id}`, {
      withCredentials: true,
    });
  }

  getDesignersList() {
    return this.http.get(`${this.url}/getDesignersList`, {
      withCredentials: true,
    });
  }

  connectDesigner(id: any) {
    console.log(id, 'ldskf');
    const data = id;
    return this.http.post(`${this.url}/connectDesigner/${id}`, {
      withCredentials: true,
    });
  }

  getDesignerData(id: any) {
    return this.http.get(`${this.url}/getDesignerData/${id}`, {
      withCredentials: true,
    });
  }

  getDesignerDesign(catId: any, designerId: any) {
    const params = new HttpParams()
      .set('catId', catId)
      .set('designerId', designerId);
    return this.http.get(`${this.url}/getDesignerDesign`, {
      params,
      withCredentials: true,
    });
  }

  addFeedback(feedback: any, booking_id: string | null) {
    const Data = {
      feedback,
      booking_id,
    };
    return this.http.post(`${this.url}/addFeedback`, Data, {
      withCredentials: true,
    });
  }

  getFeedBack(bookingId: string | null) {
    return this.http.get(`${this.url}/getFeedBack/${bookingId}`, {
      withCredentials: true,
    });
  }

  sendMessage(data: any) {
    return this.http.post(`${this.url}/sendMessage`, data, {
      withCredentials: true,
    });
  }
  //
  //
  //
  //
  //
  //
  //
  // designers
  designer_signup(data: any) {
    console.log('ivdem etheekkkn', data);
    return this.http.post(`${this.url}/designer/designer_signup`, data, {
      withCredentials: true,
    });
  }

  verify_designer_email(id: any, token: any) {
    let data = { id, token };
    return this.http.patch(`${this.url}/designer/verify`, data, {
      withCredentials: true,
    });
  }

  designer_login(Data: any, method: string) {
    const data = {
      Data: Data,
      method: method,
    };
    return this.http.post(`${this.url}/designer/login`, data, {
      withCredentials: true,
    });
  }

  verifyDesignerEmailforForget(email: string) {
    return this.http.get(
      `${this.url}/designer/verifyDesignerEmailforForget/${email}`,
      { withCredentials: true }
    );
  }

  changeDesignerPassword(data: any) {
    return this.http.patch(
      `${this.url}/designer/changeDesignerPassword`,
      data,
      { withCredentials: true }
    );
  }
  designer(designerId: any) {
    return this.http.get(`${this.url}/designer/designer/${designerId}`, {
      withCredentials: true,
    });
  }

  designer_logout() {
    return this.http.post(
      `${this.url}/designer/logout`,
      {},
      { withCredentials: true }
    );
  }

  getProfileData(token: any) {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.url}/designer/getProfileData`, {
      params,
      withCredentials: true,
    });
  }

  updateProfile(data: any, token: string | null) {
    const Data = { data, token };
    return this.http.patch(`${this.url}/designer/updateProfile`, Data, {
      withCredentials: true,
    });
  }

  // guard
  is_Authenticated(): boolean {
    return this.isAuthenticated;
  }

  login_check() {
    this.isAuthenticated = true;
    console.log(this.isAuthenticated, 'auth login');
  }

  retrive_Designs(id: any, token: any) {
    return this.http.get(
      `${this.url}/designer/retrive_Designs/${id}/${token}`,
      {
        withCredentials: true,
      }
    );
  }

  add_design(data: any, token: any) {
    const Data = {
      data,
      token,
    };
    return this.http.post(`${this.url}/designer/add_design`, Data, {
      withCredentials: true,
    });
  }

  updateDesign(data: any, token: any, designId: any) {
    const Data = {
      data,
      token,
      designId,
    };
    return this.http.put(`${this.url}/designer/updateDesign`, Data, {
      withCredentials: true,
    });
  }

  deleteDesignImage(link: any, designId: any) {
    const params = new HttpParams().set('link', link).set('designId', designId);
    return this.http.delete(`${this.url}/designer/deleteDesignImage`, {
      params,
      withCredentials: true,
    });
  }

  deleteDesign(id: any) {
    return this.http.delete(`${this.url}/designer/deleteDesign/${id}`, {
      withCredentials: true,
    });
  }

  getDesignData(id: any) {
    return this.http.get(`${this.url}/designer/get_design_data/${id}`, {
      withCredentials: true,
    });
  }

  sendRequest(data: any, token: any) {
    const Data = { data, token };
    return this.http.patch(`${this.url}/designer/sendRequest`, Data, {
      withCredentials: true,
    });
  }

  getRequests(token: any) {
    return this.http.get(`${this.url}/designer/getRequests/${token}`, {
      withCredentials: true,
    });
  }

  getConsultationDeatails(bookingId: string, designerId: string) {
    const params = new HttpParams()
      .set('bookingId', bookingId)
      .set('designerId', designerId);
    return this.http.get(`${this.url}/designer/getConsultationDeatails`, {
      params,
      withCredentials: true,
    });
  }

  getConsultationCount(token: any) {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.url}/designer/getConsultationCount`, {
      params,
      withCredentials: true,
    });
  }

  acceptRequest(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/acceptRequest`, bookings, {
      withCredentials: true,
    });
  }

  rejectRequest(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/rejectRequest`, bookings, {
      withCredentials: true,
    });
  }
  CancelConsultation(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/CancelConsultation`, bookings, {
      withCredentials: true,
    });
  }

  consultationDone(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/consultationDone`, bookings, {
      withCredentials: true,
    });
  }

  StartProject(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/StartProject`, bookings, {
      withCredentials: true,
    });
  }

  RejectProject(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/RejectProject`, bookings, {
      withCredentials: true,
    });
  }

  projectCompleted(id: any) {
    const bookings = {
      id: id,
    };
    return this.http.patch(`${this.url}/designer/projectCompleted`, bookings, {
      withCredentials: true,
    });
  }

  getConnectionRequests(id: any) {
    return this.http.get(`${this.url}/designer/getConnectionRequests/${id}`, {
      withCredentials: true,
    });
  }

  RejectConnection(id: any, designer: any) {
    const data = { id, designer };
    return this.http.patch(`${this.url}/designer/RejectConnection`, data, {
      withCredentials: true,
    });
  }

  acceptConnectionRequest(id: any, designer: any, userId: any) {
    const data = { id, designer, userId };
    return this.http.patch(
      `${this.url}/designer/acceptConnectionRequest`,
      data,
      { withCredentials: true }
    );
  }
  // payment for priority
  doPayment(stripeToken: any, amount: number, id: any) {
    const data = { stripeToken, amount, id };
    return this.http.post(`${this.url}/designer/doPayment`, data, {
      withCredentials: true,
    });
  }

  getCategorywiseQoute(designerID: string) {
    return this.http.get(
      `${this.url}/designer/getCategorywiseQoute/${designerID}`,
      { withCredentials: true }
    );
  }

  getCatogoryWiseDesigns(designerId: string) {
    return this.http.get(
      `${this.url}/designer/getCatogoryWiseDesigns/${designerId}`,
      { withCredentials: true }
    );
  }

  // admin
  admin_login(data: any) {
    return this.http.post(`${this.url}/admin/admin_login`, data, {
      withCredentials: true,
    });
  }

  loadAdmin(token: any) {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${this.url}/admin/load_admin`, {
      params,
      withCredentials: true,
    });
  }

  admin_logout(token: any) {
    return this.http.post(`${this.url}/admin/logout`, token, {
      withCredentials: true,
    });
  }

  add_category(data: any) {
    return this.http.post(`${this.url}/admin/add_category`, data, {
      withCredentials: true,
    });
  }

  edit_category(data: any, categoryId: any) {
    const Data = { data, categoryId };
    return this.http.patch(`${this.url}/admin/edit_category`, Data, {
      withCredentials: true,
    });
  }

  dropCategory(id: any) {
    return this.http.delete(`${this.url}/admin/dropCategory/${id}`, {
      withCredentials: true,
    });
  }

  getCategory(id: any) {
    return this.http.get(`${this.url}/admin/get_category/${id}`, {
      withCredentials: true,
    });
  }

  getPendingRequest() {
    return this.http.get(`${this.url}/admin/getPendingRequest`, {
      withCredentials: true,
    });
  }

  approveCategory(data: {}) {
    return this.http.patch(`${this.url}/admin/approveCategory`, data, {
      withCredentials: true,
    });
  }
  rejectCategoryApproval(id: any) {
    return this.http.delete(`${this.url}/admin/rejectCategoryApproval/${id}`, {
      withCredentials: true,
    });
  }

  getCounts() {
    return this.http.get(`${this.url}/admin/getCounts`, {
      withCredentials: true,
    });
  }

  getDesigners() {
    return this.http.get(`${this.url}/admin/getDesigners`, {
      withCredentials: true,
    });
  }

  blockDesigner(id: string) {
    return this.http.patch(
      `${this.url}/admin/blockDesigner/${id}`,
      {},
      { withCredentials: true }
    );
  }

  unblockDesigner(id: string) {
    return this.http.patch(
      `${this.url}/admin/unblockDesigner/${id}`,
      {},
      { withCredentials: true }
    );
  }

  getUsers() {
    return this.http.get(`${this.url}/admin/getUsers`);
  }

  blockUser(id: string) {
    console.log(id, 'c;;;;;;;;;;;;');

    return this.http.patch(
      `${this.url}/admin/blockUser/${id}`,
      {},
      { withCredentials: true }
    );
  }
  unblockUser(id: string) {
    return this.http.patch(
      `${this.url}/admin/unblockUser/${id}`,
      {},
      { withCredentials: true }
    );
  }
}
