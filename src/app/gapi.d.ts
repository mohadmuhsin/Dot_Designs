declare namespace gapi.auth2 {
  interface GoogleUser {
    getId(): string;
    getBasicProfile(): any; // Replace 'any' with the appropriate type for your use case
  }

}