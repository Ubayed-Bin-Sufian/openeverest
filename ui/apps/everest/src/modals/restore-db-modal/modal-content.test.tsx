// Copyright (C) 2026 The OpenEverest Contributors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { ReactNode } from 'react';
import { Messages } from './restore-db-modal.messages';
import { defaultValues } from './restore-db-modal-schema';
import { ModalContent } from './modal-content';

const FormWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm({ defaultValues });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ModalContent PITR option', () => {
  it('omits the PITR radio when hidden by permissions', () => {
    render(
      <FormWrapper>
        <ModalContent
          isLoading={false}
          header="Restore"
          succeededBackups={[]}
          pitrStorages={[]}
          isPitrHiddenByPermissions
        />
      </FormWrapper>
    );

    expect(screen.getByText(Messages.fromBackup)).toBeInTheDocument();
    expect(screen.queryByText(Messages.fromPitr)).not.toBeInTheDocument();
  });

  it('shows a disabled PITR radio when permissions allow but no storage is available', () => {
    render(
      <FormWrapper>
        <ModalContent
          isLoading={false}
          header="Restore"
          succeededBackups={[]}
          pitrStorages={[]}
          isPitrHiddenByPermissions={false}
        />
      </FormWrapper>
    );

    expect(screen.getByText(Messages.fromPitr)).toBeInTheDocument();
    expect(screen.getByTestId('radio-option-fromPITR')).toBeDisabled();
  });
});
