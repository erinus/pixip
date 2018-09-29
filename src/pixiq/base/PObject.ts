import * as UUID from 'uuid';

export class PObject {
		public ID: string;
		constructor() {
				this.ID = UUID.v4();
		}
}
