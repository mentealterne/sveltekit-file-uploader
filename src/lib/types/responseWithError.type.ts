export type ResponseWithError<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: string;
	  };
