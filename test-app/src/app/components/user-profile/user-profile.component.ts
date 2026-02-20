import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  isActive: boolean;
}

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private readonly userService = inject(UserService);

  userId = input.required<number>();
  showActions = input<boolean>(true);

  userUpdated = output<User>();
  userDeleted = output<number>();

  isEditing = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  user = signal<User | null>(null);

  displayName = computed(() => {
    const currentUser = this.user();
    return currentUser ? `${currentUser.name} (${currentUser.email})` : 'Unknown User';
  });

  statusClass = computed(() => {
    const currentUser = this.user();
    return currentUser?.isActive ? 'status-active' : 'status-inactive';
  });

  async loadUser(): Promise<void> {
    this.isLoading.set(true);
    try {
      const userData = await this.userService.getUser(this.userId());
      this.user.set(userData);
    } finally {
      this.isLoading.set(false);
    }
  }

  toggleEdit(): void {
    this.isEditing.update(value => !value);
  }

  async saveUser(): Promise<void> {
    const currentUser = this.user();
    if (!currentUser) return;

    this.isLoading.set(true);
    try {
      const updated = await this.userService.updateUser(currentUser);
      this.user.set(updated);
      this.userUpdated.emit(updated);
      this.isEditing.set(false);
    } finally {
      this.isLoading.set(false);
    }
  }

  async deleteUser(): Promise<void> {
    const currentUser = this.user();
    if (!currentUser) return;

    this.isLoading.set(true);
    try {
      await this.userService.deleteUser(currentUser.id);
      this.userDeleted.emit(currentUser.id);
    } finally {
      this.isLoading.set(false);
    }
  }
}
